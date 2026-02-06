// import twilio from "twilio";
// import "dotenv/config"

// // Twillo creaditials form env
// const accountSid = process.env.TWILLO_ACCOUNT_SID;
// const authToken = process.env.TWILLO_AUTH_TOKEN;
// const serviceSid = process.env.TWILLO_SERVICE_SID;

// const client = twilio(accountSid, authToken);

// export const sendOtpToPhoneNumber = async (phoneNumber) => {
//   try {
//     console.log("sending otp to this number", phoneNumber);
//     if (!phoneNumber) {
//       throw new Error("phone number is required");
//     }
//     const response = await client.verify.v2
//       .services(serviceSid)
//       .verifications.create({
//         to: phoneNumber,
//         channel: "sms",
//       });
//     console.log("this is my otp response", response);
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to send otp");
//   }
// };

// export const verifyOtp = async (phoneNumber, otp) => {
//   try {
//     console.log("this is my otp", otp);
//     console.log("this number", phoneNumber);
//     const response = await client.verify.v2
//       .services(serviceSid)
//       .verificationChecks.create({
//         to: phoneNumber,
//         code: otp,
//       });
//     console.log("this is my otp response", response);
//     return response;
//   } catch (error) {
//     console.error(error);
//     throw new Error("otp verification failed");
//   }
// };

import twilio from "twilio";
import "dotenv/config";

const accountSid = process.env.TWILLO_ACCOUNT_SID;
const authToken = process.env.TWILLO_AUTH_TOKEN;
const serviceSid = process.env.TWILLO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export const sendOtpToPhoneNumber = async (phoneNumber) => {
  if (!phoneNumber) throw new Error("Phone number is required");

  try {
    console.log("Sending OTP to:", phoneNumber);

    // Dev mode: don't actually send OTP
    if (process.env.NODE_ENV !== "production") {
      console.log("📲 DEV OTP (mock): 123456");
      return { status: "pending", sid: "DEV-MOCK-SID" };
    }

    const response = await client.verify.v2
      .services(serviceSid)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    console.log("Twilio response:", response);
    return response;
  } catch (error) {
    console.error("Twilio error:", error);

    // Handle Twilio rate-limit specifically
    if (error?.status === 429) {
      const msg = "Too many OTP requests. Please try again after a minute.";
      const rateError = new Error(msg);
      rateError.status = 429;
      throw rateError;
    }

    throw new Error("Failed to send OTP");
  }
};

export const verifyOtp = async (phoneNumber, otp) => {
  if (!phoneNumber || !otp)
    throw new Error("Phone number and OTP are required");

  try {
    console.log("Verifying OTP for:", phoneNumber, "Code:", otp);

    // Dev mode: always approve
    if (process.env.NODE_ENV !== "production") {
      console.log("📲 DEV OTP verification approved");
      return { status: "approved" };
    }

    const response = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: phoneNumber,
        code: otp,
      });

    console.log("Twilio verify response:", response);
    return response;
  } catch (error) {
    console.error("Twilio verification error:", error);
    throw new Error("OTP verification failed");
  }
};
