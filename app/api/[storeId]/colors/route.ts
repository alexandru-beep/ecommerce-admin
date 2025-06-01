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

  const storByUserId = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!storByUserId) {
    return new NextResponse("Unautorized", { status: 405 });
  }

  const colors = await prismadb.color.create({
    data: {
      name,
      value,
      storeId: storeId,
    },
  });

  return NextResponse.json(colors);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ storeId: string }> }
) {
  const { storeId } = await context.params;

  if (!storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  return NextResponse.json(colors);
}
