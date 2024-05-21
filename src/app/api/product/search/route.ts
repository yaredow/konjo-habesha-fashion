import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const text = request.nextUrl.searchParams.get("text");

  if (!text || text.trim() === "") {
    return NextResponse.json(
      { message: "Query cannot be empty" },
      { status: 400 },
    );
  }

  try {
    const result = await prisma.$queryRaw`[
      {
        $search: {
          index: "Search-text",
          text: {
            query: ${text},
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ]`;

    if (!result) {
      return NextResponse.json(
        { message: "No results found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
