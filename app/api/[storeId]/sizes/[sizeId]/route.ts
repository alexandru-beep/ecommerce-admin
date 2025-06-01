import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  context: { params: Promise<{ sizeId: string }> }
) {
  const { sizeId } = await context.params;

  if (!sizeId) {
    return new NextResponse("Size id is required", { status: 400 });
  }

  const size = await prismadb.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return NextResponse.json(size);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ sizeId: string; storeId: string }> }
) {
  const { sizeId, storeId } = await context.params;


  if (!sizeId) {
    return new NextResponse("Size id is required", { status: 400 });
  }



  const size = await prismadb.size.delete({
    where: {
      id: sizeId,
    },
  });

  return NextResponse.json(size);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ sizeId: string; storeId: string }> }
) {
  const { sizeId, storeId } = await context.params;

  const body = await req.json();

  const { name, value } = body;


  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  if (!value) {
    return new NextResponse("Value is required", { status: 400 });
  }

  if (!sizeId) {
    return new NextResponse("Size id is required", { status: 400 });
  }


  const size = await prismadb.size.update({
    where: {
      id: sizeId,
    },
    data: {
      name,
      value,
    },
  });

  return NextResponse.json(size);
}
