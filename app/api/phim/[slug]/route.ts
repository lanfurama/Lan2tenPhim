import { ophimFetch } from "@/lib/ophim";
import type { OPhimDetailResponse } from "@/types/ophim";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json(
      { status: "error", message: "Thiếu slug" },
      { status: 400 }
    );
  }

  try {
    const data = await ophimFetch<OPhimDetailResponse>(`/v1/api/phim/${slug}`);
    return NextResponse.json(data);
  } catch (err) {
    console.error("API phim error:", err);
    return NextResponse.json(
      { status: "error", message: "Không thể tải thông tin phim" },
      { status: 502 }
    );
  }
}
