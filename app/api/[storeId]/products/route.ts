import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  context: { params: Promise<{ storeId: string }> }
) {
  const { storeId } = await context.params;

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

  if (!storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const product = await prismadb.product.create({
    data: {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
      storeId: storeId,
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
    },
  });

  return NextResponse.json(product);
}

export async function GET(
  req: Request,
  context: { params: Promise<{ storeId: string }> }
) {
  const { storeId } = await context.params;
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId") || undefined;
  const colorId = searchParams.get("colorId") || undefined;
  const sizeId = searchParams.get("sizeId") || undefined;
  const isFeatured = searchParams.get("isFeatured");

  if (!storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      storeId: storeId,
      categoryId,
      colorId,
      sizeId,
      isFeatured: isFeatured ? true : undefined,
      isArchived: false,
    },
    include: {
      images: true,
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(products);
}
