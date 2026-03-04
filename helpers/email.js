import nodemailer from "nodemailer";

// Konfigurasi transporter menggunakan SMTP Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fungsi untuk mengirim email
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"PC Builder App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Berhasil dikirim ke: ${info.accepted}`);
    return info;
  } catch (error) {
    console.error(`[Email] Gagal mengirim ke ${to}`, error.message);
  }
};