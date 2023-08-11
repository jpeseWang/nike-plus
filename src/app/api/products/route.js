import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connect from "@/utils/db";

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("username");
  try {
    await connect();
    const products = await Product.find(username && { username });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
export const POST = async (request) => {
  const body = await request.json();

  const newPost = new Product(body);

  try {
    await connect();

    await newPost.save();

    return new NextResponse("Product has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
