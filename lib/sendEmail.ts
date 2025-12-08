import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }: any) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
  });

  await transporter.sendMail({
    from: `"Restaurant Reservation" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
