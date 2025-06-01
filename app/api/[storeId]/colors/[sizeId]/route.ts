import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  context: { params: Promise<{ colorId: string }> }
) {
  const { colorId } = await context.params;

  if (!colorId) {
    return new NextResponse("Color id is required", { status: 400 });
  }

  const color = await prismadb.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return NextResponse.json(color);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ colorId: string; storeId: string }> }
) {
  const { colorId } = await context.params;

  if (!colorId) {
    return new NextResponse("Color id is required", { status: 400 });
  }

  const color = await prismadb.color.delete({
    where: {
      id: colorId,
    },
  });

  return NextResponse.json(color);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ colorId: string; storeId: string }> }
) {
  const { colorId } = await context.params;

  const body = await req.json();

  const { name, value } = body;

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  if (!value) {
    return new NextResponse("Value is required", { status: 400 });
  }

  if (!colorId) {
    return new NextResponse("Color id is required", { status: 400 });
  }

  const color = await prismadb.color.update({
    where: {
      id: colorId,
    },
    data: {
      name,
      value,
    },
  });

  return NextResponse.json(color);
}
