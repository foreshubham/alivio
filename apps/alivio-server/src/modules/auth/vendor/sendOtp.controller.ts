import { Request, Response } from "express";
import prisma from "../../../lib/prisma";
import { sendOtp } from "../../../utils/sendOtp";

// Generate a 6-digit OTP
const generateOtp = (): string => Math.floor(100000 + Math.random() * 900000).toString();

export const sendVendorOtp = async (req: Request, res: Response) => {
  const { phone, email } = req.body;
  if (!phone || !email) {
    return res.status(400).json({ message: "Phone and email are required" });
  }

  try {
    // Check if vendor exists
    let vendor = await prisma.vendor.findUnique({ where: { phone } });
    if (!vendor) {
      vendor = await prisma.vendor.create({
        data: { phone, email }
      });
    }

    const otp = generateOtp();

    // Here you would store OTP in DB with expiration (optional)
    // For simplicity, sending it via email
    await sendOtp(email, otp);

    return res.status(200).json({ message: "OTP sent successfully", otp }); // otp for testing
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
