import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { sendLinkedInConversion } from './_lib/linkedin';

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
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
}

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
  try {
    await transporter.sendMail({
      from: `"Vencol Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'forms@cms.gobigagency.co',
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

  // 4. Fire LinkedIn conversion event (non-blocking for the user response)
  const linkedInResult = await sendLinkedInConversion({
    email,
    firstName,
    lastName,
    liFatId,
  });
  if (!linkedInResult.ok) {
    console.error('LinkedIn conversion failed:', linkedInResult);
  }

  // 5. TODO: persist lead to Excel (pending backend decision from user)

  return response.status(200).json({
    message: 'Email sent successfully',
    linkedIn: linkedInResult.ok ? 'tracked' : 'skipped',
  });
}
