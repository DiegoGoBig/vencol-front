import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, topic, message, recaptchaToken } = request.body;

  // 1. Verify reCAPTCHA
  try {
    const recaptchaVerify = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: 'POST' }
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
      `,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${topic}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return response.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return response.status(500).json({ message: 'Error sending email' });
  }
}
