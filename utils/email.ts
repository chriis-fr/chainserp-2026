import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

// Create reusable transporter
function createTransporter() {
  // Remove quotes from env vars if present
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').replace(/^["']|["']$/g, '');
  const port = parseInt((process.env.SMTP_PORT || '587').replace(/^["']|["']$/g, ''));
  const secure = (process.env.SMTP_SECURE || 'false').replace(/^["']|["']$/g, '') === 'true';
  const user = (process.env.SMTP_USER || '').replace(/^["']|["']$/g, '');
  const rawPass = process.env.SMTP_PASSWORD || '';
  const pass = rawPass.replace(/^["']|["']$/g, '');

  // Debug logging (remove sensitive data in production)
  console.log('SMTP Config:', {
    host,
    port,
    secure,
    user,
    rawPassLength: rawPass.length,
    passLength: pass.length,
    rawPassPreview: rawPass.substring(0, 2) + '...',
  });

  const config = {
    host,
    port,
    secure, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
    // Additional options for better compatibility with Zoho
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3',
    },
    // For Zoho, sometimes need to explicitly set auth method
    authMethod: 'PLAIN',
  };

  return nodemailer.createTransport(config);
}

export async function sendEmail(options: SendEmailOptions) {
  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: options.from,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
