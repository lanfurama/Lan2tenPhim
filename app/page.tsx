import { MovieCard } from "@/components/MovieCard";
import type { OPhimHomeResponse } from "@/types/ophim";

async function getHome() {
  const base = process.env.OPHIM_BASE_URL ?? "https://ophim1.com";
  const res = await fetch(`${base}/v1/api/home`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch home");
  return res.json() as Promise<OPhimHomeResponse>;
}

export default async function HomePage() {
  let data: OPhimHomeResponse | null = null;
  let error = false;
  try {
    data = await getHome();
  } catch {
    error = true;
  }

  if (error || !data?.data?.items) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          Không thể tải danh sách phim. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  const items = data.data.items;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Phim mới cập nhật
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
