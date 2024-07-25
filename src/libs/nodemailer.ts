import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <p><a href="${resetUrl}">${resetUrl}</a></p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return info;
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};
