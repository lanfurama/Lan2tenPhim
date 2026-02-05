import { ophimFetch } from "@/lib/ophim";
import type { OPhimHomeResponse } from "@/types/ophim";
import { NextRequest, NextResponse } from "next/server";

const VALID_SLUGS = [
  "phim-moi",
  "phim-bo",
  "phim-le",
  "tv-shows",
  "hoat-hinh",
  "phim-vietsub",
  "phim-thuyet-minh",
  "phim-long-tien",
  "phim-bo-dang-chieu",
  "phim-bo-hoan-thanh",
  "phim-sap-chieu",
  "subteam",
  "phim-chieu-rap",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) {
    return NextResponse.json(
      { status: "error", message: "Slug không hợp lệ" },
      { status: 400 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const query: Record<string, string> = {};
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const sort_field = searchParams.get("sort_field");
  const sort_type = searchParams.get("sort_type");
  const category = searchParams.get("category");
  const country = searchParams.get("country");
  const year = searchParams.get("year");
  if (page) query.page = page;
  if (limit) query.limit = limit;
  if (sort_field) query.sort_field = sort_field;
  if (sort_type) query.sort_type = sort_type;
  if (category) query.category = category;
  if (country) query.country = country;
  if (year) query.year = year;

  try {
    const data = await ophimFetch<OPhimHomeResponse>(
      `/v1/api/danh-sach/${slug}`,
      query
    );
    return NextResponse.json(data);
  } catch (err) {
    console.error("API danh-sach error:", err);
    return NextResponse.json(
      { status: "error", message: "Không thể tải danh sách" },
      { status: 502 }
    );
  }
}
