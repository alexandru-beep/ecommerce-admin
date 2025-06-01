import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  context: { params: Promise<{ storeId: string }> }
) {
  const { storeId } = await context.params;
  const { userId } = auth();

  const body = await req.json();

  const { name, value } = body;

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  if (!value) {
    return new NextResponse("Value is required", { status: 400 });
  }

  if (!storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const storeByUserId = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!storeByUserId) {
    return new NextResponse("Unauthorized", { status: 405 });
  }

  const size = await prismadb.size.create({
    data: {
      name,
      value,
      storeId: storeId,
    },
  });

  return NextResponse.json(size);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ storeId: string }> }
) {
  const { storeId } = await context.params;

  if (!storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  return NextResponse.json(sizes);
}
