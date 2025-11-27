import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/user";


export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password} = await request.json();
     
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists", sucess: false },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User created successfully", user: newUser , sucess: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error.message , sucess: false },
      { status: 500 }
    );
  }
}

    