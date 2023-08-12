import Account from "@/models/test";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password, role } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newAccount = new Account({
    name,
    email,
    password: hashedPassword,
    role,
  });

  try {
    await newAccount.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
