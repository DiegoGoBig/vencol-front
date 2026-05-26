import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { sendLinkedInConversion } from './_lib/linkedin.js';
import { appendToSheet } from './_lib/sheets.js';
import { buildWelcomeEmail } from './_lib/welcome-email.js';
import { sendHostingerReachContact } from './_lib/hostinger.js';

const HOSTINGER_NOTE_BY_SOURCE: Record<string, string> = {
  landing: 'landing',
  contact: 'contacto',
};

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  topic?: string;
  message?: string;
  recaptchaToken?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  liFatId?: string;
  pageUrl?: string;
  referrer?: string;
  source?: string;
}

const LANDING_EXTRA_RECIPIENTS = ['diego@gobigagency.co','rolando.castiblanco@vencol.com', 'info@vencol.com', 'Alberto@vencol.com', 'michelle.mendez@gobigagency.co'];

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    topic,
    message,
    recaptchaToken,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    liFatId,
    pageUrl,
    referrer,
    source,
  } = (request.body || {}) as ContactPayload;

  if (!firstName || !lastName || !email || !topic || !message) {
    return response.status(400).json({ message: 'Missing required fields' });
  }

  // 1. Verify reCAPTCHA
  try {
    const recaptchaVerify = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' },
    );
    const recaptchaData = await recaptchaVerify.json();

    if (!recaptchaData.success) {
      return response.status(400).json({ message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    return response.status(500).json({ message: 'Error verifying reCAPTCHA' });
  }

  // 2. Setup Nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const utmLines = [
    utm_source && `utm_source: ${utm_source}`,
    utm_medium && `utm_medium: ${utm_medium}`,
    utm_campaign && `utm_campaign: ${utm_campaign}`,
    utm_content && `utm_content: ${utm_content}`,
  ].filter(Boolean) as string[];

  // 3. Send Email
  const primaryRecipient = process.env.CONTACT_EMAIL || 'forms@cms.gobigagency.co';
  const ccRecipients = source === 'landing' ? LANDING_EXTRA_RECIPIENTS : [];

  try {
    await transporter.sendMail({
      from: `"Vencol Website" <${process.env.SMTP_USER}>`,
      to: primaryRecipient,
      cc: ccRecipients.length ? ccRecipients : undefined,
      subject: `Nuevo mensaje de contacto: ${topic}`,
      text: `
        Nombre: ${firstName} ${lastName}
        Email: ${email}
        Asunto: ${topic}
        Mensaje: ${message}
        ${utmLines.length ? '\nAtribución:\n' + utmLines.join('\n') : ''}
        ${pageUrl ? `\nURL: ${pageUrl}` : ''}
        ${referrer ? `\nReferrer: ${referrer}` : ''}
      `,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${topic}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${
          utmLines.length
            ? `<h4>Atribución</h4><ul>${utmLines
                .map((l) => `<li>${l}</li>`)
                .join('')}</ul>`
            : ''
        }
        ${pageUrl ? `<p><strong>URL:</strong> ${pageUrl}</p>` : ''}
        ${referrer ? `<p><strong>Referrer:</strong> ${referrer}</p>` : ''}
      `,
    });
  } catch (error) {
    console.error('SMTP Error:', error);
    return response.status(500).json({ message: 'Error sending email' });
  }

  // 3b. Send welcome email to the lead (non-blocking — failure should not break the form flow)
  try {
    const welcome = buildWelcomeEmail(firstName);
    await transporter.sendMail({
      from: `"VENCOL" <${process.env.SMTP_USER}>`,
      to: email,
      subject: welcome.subject,
      text: welcome.text,
      html: welcome.html,
    });
    console.log('[Welcome] Sent to', email);
  } catch (welcomeError) {
    console.error('[Welcome] Failed to send welcome email:', welcomeError);
  }

  // 3c. Create contact in Hostinger Reach — segments match contacts by the `note` field
  const hostingerNote = source ? HOSTINGER_NOTE_BY_SOURCE[source] : undefined;
  if (hostingerNote) {
    const hostingerResult = await sendHostingerReachContact({
      email,
      firstName,
      lastName,
      phone,
      note: hostingerNote,
    });
    if (hostingerResult.ok) {
      console.log('[Hostinger] Contact created for', email, '(note:', hostingerNote + ')');
    } else {
      console.error('[Hostinger] Failed:', hostingerResult.status, hostingerResult.error);
    }
  }

  // 4. Fire LinkedIn conversion event (landing only — contact form is excluded)
  let linkedInResult: { ok: boolean; status?: number; error?: string } = { ok: false, error: 'skipped' };
  if (source === 'landing') {
    console.log('[LinkedIn] payload:', { email: email ? `${email.slice(0,3)}***` : 'MISSING', firstName, lastName, liFatId: liFatId || 'MISSING' });
    linkedInResult = await sendLinkedInConversion({
      email,
      firstName,
      lastName,
      liFatId,
    });
    console.log('[LinkedIn] result:', JSON.stringify(linkedInResult));
    if (!linkedInResult.ok) {
      console.error('[LinkedIn] conversion failed:', linkedInResult);
    }
  }

  // 5. Persist lead to Google Sheets (landing only — contact form is excluded)
  if (source === 'landing') {
    const spreadsheetId = '1ARjwatClsCWcSzrCSZ66-fE89_34sEI8T86Cvk7p4_w';
    const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    const sheetValues = [
      timestamp,
      `${firstName} ${lastName}`,
      email,
      topic,
      message,
      utm_source || '',
      utm_medium || '',
      utm_campaign || '',
      utm_content || '',
      pageUrl || '',
      referrer || ''
    ];

    try {
      const sheetResult = await appendToSheet(spreadsheetId, sheetValues);
      if (!sheetResult.ok) {
        console.error('[Sheets] Failed to append:', sheetResult.error);
      } else {
        console.log('[Sheets] Lead appended successfully');
      }
    } catch (err) {
      console.error('[Sheets] Integration error:', err);
    }
  }

  return response.status(200).json({
    message: 'Email sent and lead captured successfully',
    linkedIn: linkedInResult.ok ? 'tracked' : 'skipped',
  });
}
