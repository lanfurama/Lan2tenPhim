import { ophimFetch, posterUrl } from "@/lib/ophim";
import type { OPhimDetailResponse } from "@/types/ophim";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPhim(slug: string) {
  return ophimFetch<OPhimDetailResponse>(`/v1/api/phim/${slug}`);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PhimPage({ params }: PageProps) {
  const { slug } = await params;
  let data: OPhimDetailResponse | null = null;
  try {
    data = await getPhim(slug);
  } catch {
    notFound();
  }
  const movie = data?.data?.movie ?? data?.data?.item;
  if (!movie) notFound();

  const episodes = data.data.episodes ?? data.data.item?.episodes ?? [];
  const firstServer = episodes[0];
  const serverData = firstServer?.server_data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="shrink-0">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700 md:w-64">
            <Image
              src={posterUrl(movie.poster_url ?? movie.thumb_url)}
              alt={movie.name}
              fill
              className="object-cover"
              sizes="256px"
              priority
            />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {movie.name}
          </h1>
          {movie.origin_name && (
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              {movie.origin_name}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {movie.year && (
              <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
                {movie.year}
              </span>
            )}
            {movie.quality && (
              <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
                {movie.quality}
              </span>
            )}
            {movie.lang && (
              <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
                {movie.lang}
              </span>
            )}
            {movie.time && (
              <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-700">
                {movie.time}
              </span>
            )}
          </div>
          {movie.category && movie.category.length > 0 && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Thể loại:{" "}
              {movie.category.map((c) => c.name).join(", ")}
            </p>
          )}
          {movie.country && movie.country.length > 0 && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Quốc gia: {movie.country.map((c) => c.name).join(", ")}
            </p>
          )}
          {(movie.description ?? movie.content) && (
            <div className="mt-4">
              <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Nội dung
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-6">
                {movie.description ?? movie.content}
              </p>
            </div>
          )}
        </div>
      </div>

      {serverData.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Danh sách tập
          </h2>
          <div className="flex flex-wrap gap-2">
            {serverData.map((ep) => (
              <Link
                key={ep.slug}
                href={`/xem?slug=${encodeURIComponent(slug)}&tap=${encodeURIComponent(ep.slug)}`}
                className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {ep.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
