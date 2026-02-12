// import nodemailer from "nodemailer";
// import "dotenv/config";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Gmail services connection failed");
//   } else {
//     console.log("Gmail configured properly and ready to send email");
//   }
// });

// export const sendOtpToEmail = async (email, otp) => {
//   const html = `
//     <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//       <h2 style="color: #075e54;">🔐 WhatsApp Web Verification</h2>

//       <p>Hi there,</p>

//       <p>Your one-time password (OTP) to verify your WhatsApp Web account is:</p>

//       <h1 style="background: #e0f7fa; color: #000; padding: 10px 20px; display: inline-block; border-radius: 5px; letter-spacing: 2px;">
//         ${otp}
//       </h1>

//       <p><strong>This OTP is valid for the next 5 minutes.</strong> Please do not share this code with anyone.</p>

//       <p>If you didn’t request this OTP, please ignore this email.</p>

//       <p style="margin-top: 20px;">Thanks & Regards,<br/>WhatsApp Web Security Team</p>

//       <hr style="margin: 30px 0;" />

//       <small style="color: #777;">This is an automated message. Please do not reply.</small>
//     </div>
//   `;
//   await transporter.sendMail({
//     from: `whatsapp web < ${process.env.EMAIL_USER}`,
//     to: email,
//     subject: "tour Whatsapp Verification Code",
//     html,
//   });
// };

// import nodemailer from "nodemailer";
// import "dotenv/config";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// // verify once when server starts
// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ Gmail SMTP failed:", error.message);
//   } else {
//     console.log("✅ Gmail SMTP ready");
//   }
// });

// export const sendOtpToEmail = async (email, otp) => {
//   try {
//     await transporter.sendMail({
//       from: `"WhatsApp Web" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your WhatsApp Verification Code",
//       html: `
//         <h2>🔐 WhatsApp Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>This OTP is valid for 5 minutes.</p>
//       `,
//     });

//     console.log("✅ OTP sent to:", email);
//   } catch (error) {
//     console.error("❌ Email send failed:", error);
//     throw new Error("Email OTP failed");
//   }
// };

// import nodemailer from "nodemailer";
// import "dotenv/config";

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "charlie.reinger@ethereal.email",
//     pass: "Uer3BunVqEvvU9mpSZ",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// // verify once when server starts
// transporter.verify((error) => {
//   if (error) {
//     console.error("❌ Gmail SMTP failed:", error.message);
//   } else {
//     console.log("✅ Gmail SMTP ready");
//   }
// });

// export const sendOtpToEmail = async (email, otp) => {
//   try {
//     await transporter.sendMail({
//       from: `"WhatsApp Web" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your WhatsApp Verification Code",
//       html: `
//         <h2>🔐 WhatsApp Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>This OTP is valid for 5 minutes.</p>
//       `,
//     });

//     console.log("✅ OTP sent to:", email);
//   } catch (error) {
//     console.error("❌ Email send failed:", error);
//     throw new Error("Email OTP failed");
//   }
// };

// import nodemailer from "nodemailer";
// import "dotenv/config";

// let transporter;

// // Initialize transporter based on environment
// const initTransporter = async () => {

//   if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//     // ✅ Production: Gmail or any SMTP
//     transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com", // or any SMTP host
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // For Gmail, use App Password
//       },
//       tls: {
//         rejectUnauthorized: false,
//       },
//     });
//   } else {
//     // ⚡ Fallback: Ethereal for testing
//     const testAccount = await nodemailer.createTestAccount();
//     transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass,
//       },
//     });

//     console.log("⚡ Using Ethereal test account:", testAccount.user);
//   }

//   // Verify transporter
//   transporter.verify((error) => {
//     if (error) {
//       console.error("❌ Email transporter failed:", error.message);
//     } else {
//       console.log("✅ Email transporter ready");
//     }
//   });
// };

// // Initialize transporter immediately
// initTransporter();

// // Function to send OTP
// export const sendOtpToEmail = async (toEmail, otp) => {
//   if (!transporter) {
//     throw new Error("Email transporter not initialized");
//   }

//   try {
//     const info = await transporter.sendMail({
//       from: `"WhatsApp Web" <${process.env.EMAIL_USER || "ethereal@test.com"}>`,
//       to: toEmail,
//       subject: "Your WhatsApp Verification Code",
//       html: `
//         <h2>🔐 WhatsApp Verification</h2>
//         <p>Your OTP is:</p>
//         <h1>${otp}</h1>
//         <p>This OTP is valid for 5 minutes.</p>
//       `,
//     });

//     console.log("✅ OTP sent to:", toEmail);

//     // If using Ethereal, log the preview URL
//     if (nodemailer.getTestMessageUrl(info)) {
//       console.log("📄 Preview URL:", nodemailer.getTestMessageUrl(info));
//     }
//   } catch (error) {
//     console.error("❌ Email send failed:", error);
//     throw new Error("Email OTP failed");
//   }
// };

// import nodemailer from "nodemailer";
// import "dotenv/config";

// let transporter;

// export const initTransporter = async () => {
//   if (transporter) return transporter;

//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//     throw new Error("Email credentials missing");
//   }

//   transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS, // App password
//     },
//     connectionTimeout: 10000,
//     greetingTimeout: 10000,
//     socketTimeout: 10000,
//   });

//   await transporter.verify();
//   console.log("✅ Email transporter ready");

//   return transporter;
// };

// export const sendOtpToEmail = async (toEmail, otp) => {
//   try {
//     const mailer = await initTransporter();

//     await mailer.sendMail({
//       from: `"WhatsApp" <${process.env.EMAIL_USER}>`,
//       to: toEmail,
//       subject: "Your OTP Code",
//       html: `<h1>${otp}</h1>`,
//     });
//   } catch (error) {
//     console.error("❌ Email send failed:", error.message);
//     throw new Error("Email OTP failed");
//   }
// };



// import { Resend } from "resend";
// import "dotenv/config";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendOtpToEmail = async (toEmail, otp) => {
//   try {
//     if (!process.env.RESEND_API_KEY) {
//       throw new Error("RESEND_API_KEY is missing in environment variables");
//     }

//     const { data, error } = await resend.emails.send({
//       from: "WhatsApp <onboarding@resend.dev>", 
//       to: toEmail,
//       subject: "Your WhatsApp Verification Code",
//       html: `
//         <div style="font-family: Arial, sans-serif;">
//           <h2>🔐 WhatsApp Verification</h2>
//           <p>Your OTP is:</p>
//           <h1 style="letter-spacing: 5px;">${otp}</h1>
//           <p>This code is valid for 5 minutes.</p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error("❌ Resend Error:", error);
//       throw new Error("Email OTP failed");
//     }

//     console.log("✅ OTP sent successfully:", data?.id);

//   } catch (err) {
//     console.error("❌ Email send failed:", err.message);
//     throw new Error("Email OTP failed");
//   }
// };



import Mailjet from "node-mailjet";
import "dotenv/config";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

export const sendOtpToEmail = async (toEmail, otp) => {
  try {
    const request = mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "noreply@mailjet.com",
              Name: "WhatsApp",
            },
            To: [
              {
                Email: toEmail,
              },
            ],
            Subject: "Your WhatsApp Verification Code",
            HTMLPart: `
              <div style="font-family: Arial, sans-serif;">
                <h2>🔐 WhatsApp Verification</h2>
                <h1>${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
              </div>
            `,
          },
        ],
      });

    await request;
    console.log("✅ OTP sent to email:", toEmail);
  } catch (error) {
    console.error("❌ Mailjet Error:", error.message);
    throw new Error("Email OTP failed");
  }
};
