import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params;

  if (!productId) {
    return new NextResponse("Product id is Required", { status: 400 });
  }

  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      category: true,
      color: true,
      size: true,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ storeId: string; productId: string }> }
) {
  const {productId } = await context.params;

  if (!productId) {
    return new NextResponse("Product id is Required", { status: 400 });
  }

  const product = await prismadb.product.delete({
    where: {
      id: productId,
    },
  });

  return NextResponse.json(product);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ productId: string; storeId: string }> }
) {
  const { productId } = await context.params;


  const body = await req.json();

  const {
    name,
    price,
    categoryId,
    colorId,
    sizeId,
    images,
    isFeatured,
    isArchived,
  } = body;

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  if (!images || !images.length) {
    return new NextResponse("Images are required", { status: 400 });
  }

  if (!price) {
    return new NextResponse("Price Url is required", { status: 400 });
  }

  if (!categoryId) {
    return new NextResponse("Category id is required", { status: 400 });
  }

  if (!colorId) {
    return new NextResponse("Color id is required", { status: 400 });
  }

  if (!sizeId) {
    return new NextResponse("Size id is required", { status: 400 });
  }

  if (!productId) {
    return new NextResponse("Product id is required", { status: 400 });
  }

  await prismadb.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images: {
        deleteMany: {},
      },
      isFeatured,
      isArchived,
    },
  });

  const product = await prismadb.product.update({
    where: {
      id: productId,
    },
    data: {
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
    },
  });

  return NextResponse.json(product);
}
