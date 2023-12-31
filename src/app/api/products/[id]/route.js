import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connect from "@/utils/db";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    const product = await Product.findById(id);
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Product.findByIdAndDelete(id);

    return new NextResponse("Product has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
