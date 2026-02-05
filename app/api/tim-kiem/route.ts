import { ophimFetch } from "@/lib/ophim";
import type { OPhimHomeResponse } from "@/types/ophim";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword")?.trim();
  if (!keyword) {
    return NextResponse.json(
      { status: "error", message: "Thiếu keyword" },
      { status: 400 }
    );
  }

  try {
    const data = await ophimFetch<OPhimHomeResponse>("/v1/api/tim-kiem", {
      keyword,
      page: searchParams.get("page") ?? "1",
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error("API tim-kiem error:", err);
    return NextResponse.json(
      { status: "error", message: "Không thể tìm kiếm" },
      { status: 502 }
    );
  }
}
