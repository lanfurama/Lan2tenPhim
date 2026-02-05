import { ophimFetch } from "@/lib/ophim";
import type { OPhimHomeResponse } from "@/types/ophim";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await ophimFetch<OPhimHomeResponse>("/v1/api/home");
    return NextResponse.json(data);
  } catch (err) {
    console.error("API home error:", err);
    return NextResponse.json(
      { status: "error", message: "Không thể tải dữ liệu" },
      { status: 502 }
    );
  }
}
