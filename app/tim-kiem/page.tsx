import { MovieCard } from "@/components/MovieCard";
import { ophimFetch } from "@/lib/ophim";
import type { OPhimHomeResponse } from "@/types/ophim";

async function getSearchResults(
  keyword: string,
  page: string
): Promise<OPhimHomeResponse | null> {
  try {
    return await ophimFetch<OPhimHomeResponse>("/v1/api/tim-kiem", {
      keyword,
      page: page || "1",
    });
  } catch {
    return null;
  }
}

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function TimKiemPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const keyword =
    typeof resolved.keyword === "string" ? resolved.keyword.trim() : "";
  const page = typeof resolved.page === "string" ? resolved.page : "1";

  if (!keyword) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Tìm kiếm phim
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Nhập từ khóa vào ô tìm kiếm trên header để bắt đầu.
        </p>
      </div>
    );
  }

  const data = await getSearchResults(keyword, page);
  if (!data?.data?.items) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Tìm kiếm: &quot;{keyword}&quot;
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Không tải được kết quả. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  const items = data.data.items;
  const pagination = data.data.params?.pagination;
  const currentPage = pagination?.currentPage ?? 1;
  const totalPages = pagination
    ? Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)
    : 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Tìm kiếm: &quot;{keyword}&quot;
      </h1>
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        {pagination?.totalItems ?? 0} kết quả
      </p>

      {items.length === 0 ? (
        <p className="text-zinc-500 dark:text-zinc-400">
          Không tìm thấy phim nào phù hợp.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {items.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-8 flex justify-center gap-2">
              {currentPage > 1 && (
                <a
                  href={
                    currentPage === 2
                      ? `/tim-kiem?keyword=${encodeURIComponent(keyword)}`
                      : `/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${currentPage - 1}`
                  }
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
                  href={`/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${currentPage + 1}`}
                  className="rounded border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600"
                >
                  Sau
                </a>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
