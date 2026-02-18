import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from 'utils/email';

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { subject, description, email, name } = req.body;
  const referer = req.headers.referer;

  // Get recipient email from env or use default
  const recipientEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'contact@example.com';
  const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@example.com';

  try {
    await sendEmail({
      to: recipientEmail,
      from: senderEmail,
      subject: subject || 'Email from contact form',
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${description}\n\nSent from: ${referer || 'Not specified or hidden'}`,
      html: `<div>
        <h1>Name: ${name}</h1>
        <h2>E-mail: ${email}</h2>
        <p>${description.replace(/\n/g, '<br>')}</p>
        <p><small>Sent from: ${referer || 'Not specified or hidden'}</small></p>
      </div>`,
    });

    res.status(204).end();
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
