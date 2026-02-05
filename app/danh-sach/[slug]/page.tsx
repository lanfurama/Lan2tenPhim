import { ophimFetch } from "@/lib/ophim";
import { MovieCard } from "@/components/MovieCard";
import type { OPhimHomeResponse } from "@/types/ophim";

const SLUG_LABELS: Record<string, string> = {
  "phim-moi": "Phim mới",
  "phim-bo": "Phim bộ",
  "phim-le": "Phim lẻ",
  "tv-shows": "TV Shows",
  "hoat-hinh": "Hoạt hình",
  "phim-vietsub": "Phim Vietsub",
  "phim-thuyet-minh": "Phim thuyết minh",
  "phim-long-tien": "Phim lồng tiếng",
  "phim-bo-dang-chieu": "Phim bộ đang chiếu",
  "phim-bo-hoan-thanh": "Phim bộ hoàn thành",
  "phim-sap-chieu": "Phim sắp chiếu",
  subteam: "Subteam",
  "phim-chieu-rap": "Phim chiếu rạp",
};

async function getList(
  slug: string,
  searchParams: Record<string, string | string[] | undefined>
) {
  const query: Record<string, string> = {};
  const page = searchParams.page;
  const limit = searchParams.limit;
  const sort_field = searchParams.sort_field;
  const sort_type = searchParams.sort_type;
  const category = searchParams.category;
  const country = searchParams.country;
  const year = searchParams.year;
  if (page && typeof page === "string") query.page = page;
  if (limit && typeof limit === "string") query.limit = limit;
  if (sort_field && typeof sort_field === "string")
    query.sort_field = sort_field;
  if (sort_type && typeof sort_type === "string")
    query.sort_type = sort_type;
  if (category && typeof category === "string") query.category = category;
  if (country && typeof country === "string") query.country = country;
  if (year && typeof year === "string") query.year = year;
  return ophimFetch<OPhimHomeResponse>(`/v1/api/danh-sach/${slug}`, query);
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DanhSachPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  let data: OPhimHomeResponse | null = null;
  let error = false;
  try {
    data = await getList(slug, resolvedSearchParams);
  } catch {
    error = true;
  }

  if (error || !data?.data?.items) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          Không thể tải danh sách. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  const items = data.data.items;
  const pagination = data.data.params?.pagination;
  const title = SLUG_LABELS[slug] ?? slug;
  const currentPage = pagination?.currentPage ?? 1;
  const totalPages = pagination
    ? Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)
    : 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <ListFilters
          slug={slug}
          current={resolvedSearchParams}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-8 flex justify-center gap-2">
          {currentPage > 1 && (
            <a
              href={`/danh-sach/${slug}${queryString(resolvedSearchParams, {
                page: currentPage === 2 ? undefined : String(currentPage - 1),
              })}`}
              className="rounded border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600"
            >
              Trước
            </a>
          )}
          <span className="flex items-center px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
            Trang {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <a
              href={`/danh-sach/${slug}${queryString(resolvedSearchParams, {
                page: String(currentPage + 1),
              })}`}
              className="rounded border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600"
            >
              Sau
            </a>
          )}
        </nav>
      )}
    </div>
  );
}

function queryString(
  current: Record<string, string | string[] | undefined>,
  override: Record<string, string | null | undefined>
) {
  const p = new URLSearchParams();
  Object.entries(current).forEach(([k, v]) => {
    if (v && typeof v === "string" && !(k in override)) p.set(k, v);
  });
  Object.entries(override).forEach(([k, v]) => {
    if (v != null && v !== "") p.set(k, v);
    else p.delete(k);
  });
  const s = p.toString();
  return s ? `?${s}` : "";
}

function ListFilters({
  slug,
  current,
  totalPages,
  currentPage,
}: {
  slug: string;
  current: Record<string, string | string[] | undefined>;
  totalPages: number;
  currentPage: number;
}) {
  const base = `/danh-sach/${slug}`;
  const page = typeof current.page === "string" ? current.page : "1";
  const sortField =
    typeof current.sort_field === "string" ? current.sort_field : "";
  const sortType =
    typeof current.sort_type === "string" ? current.sort_type : "desc";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">Sắp xếp:</span>
      <a
        href={
          sortField === "modified.time" && sortType === "desc"
            ? base
            : `${base}?sort_field=modified.time&sort_type=desc`
        }
        className="rounded bg-zinc-200 px-3 py-1.5 text-sm dark:bg-zinc-700"
      >
        Mới nhất
      </a>
      <a
        href={`${base}?sort_field=year&sort_type=desc${page ? `&page=${page}` : ""}`}
        className="rounded px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      >
        Năm
      </a>
    </div>
  );
}
