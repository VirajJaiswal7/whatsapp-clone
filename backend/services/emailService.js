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



import nodemailer from "nodemailer";
import "dotenv/config";

let transporter;

// Initialize transporter based on environment
const initTransporter = async () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // ✅ Production: Gmail or any SMTP
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // or any SMTP host
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // For Gmail, use App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  } else {
    // ⚡ Fallback: Ethereal for testing
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log("⚡ Using Ethereal test account:", testAccount.user);
  }

  // Verify transporter
  transporter.verify((error) => {
    if (error) {
      console.error("❌ Email transporter failed:", error.message);
    } else {
      console.log("✅ Email transporter ready");
    }
  });
};

// Initialize transporter immediately
initTransporter();

// Function to send OTP
export const sendOtpToEmail = async (toEmail, otp) => {
  if (!transporter) {
    throw new Error("Email transporter not initialized");
  }

  try {
    const info = await transporter.sendMail({
      from: `"WhatsApp Web" <${process.env.EMAIL_USER || "ethereal@test.com"}>`,
      to: toEmail,
      subject: "Your WhatsApp Verification Code",
      html: `
        <h2>🔐 WhatsApp Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("✅ OTP sent to:", toEmail);

    // If using Ethereal, log the preview URL
    if (nodemailer.getTestMessageUrl(info)) {
      console.log("📄 Preview URL:", nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw new Error("Email OTP failed");
  }
};
