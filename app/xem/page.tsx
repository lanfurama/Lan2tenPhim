import { ophimFetch } from "@/lib/ophim";
import type { OPhimDetailResponse, OPhimEpisode } from "@/types/ophim";

const OPHIM_FRONTEND = process.env.OPHIM_BASE_URL ?? "https://ophim1.com";

async function getPhim(slug: string) {
  return ophimFetch<OPhimDetailResponse>(`/v1/api/phim/${slug}`);
}

function findEmbedUrl(
  slug: string,
  tapSlug: string,
  episodes: OPhimEpisode[] | undefined
): string | null {
  if (!episodes?.length) return null;
  for (const server of episodes) {
    const item = server.server_data?.find(
      (e) => e.slug === tapSlug || e.slug === decodeURIComponent(tapSlug)
    );
    if (item?.link_embed) return item.link_embed;
  }
  return `${OPHIM_FRONTEND}/phim/${slug}-${tapSlug}`;
}

interface PageProps {
  searchParams: Promise<{ slug?: string; tap?: string }>;
}

export default async function XemPage({ searchParams }: PageProps) {
  const { slug, tap } = await searchParams;
  if (!slug || !tap) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-zinc-500 dark:text-zinc-400">
          Thiếu thông tin phim hoặc tập. Chọn tập từ trang chi tiết phim.
        </p>
      </div>
    );
  }

  let data: OPhimDetailResponse | null = null;
  try {
    data = await getPhim(slug);
  } catch {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-zinc-500 dark:text-zinc-400">
          Không tải được thông tin phim.
        </p>
      </div>
    );
  }

  const episodes = data.data.episodes ?? data.data.item?.episodes ?? [];
  const embedUrl =
    findEmbedUrl(slug, tap, episodes) ??
    `${OPHIM_FRONTEND}/phim/${slug}-${tap}`;
  const movieName = data.data.movie?.name ?? data.data.item?.name ?? slug;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4">
        <a
          href={`/phim/${slug}`}
          className="text-sm font-medium text-zinc-600 hover:underline dark:text-zinc-400"
        >
          ← Quay lại {movieName}
        </a>
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-zinc-200 bg-black dark:border-zinc-700">
        <iframe
          title={`Xem ${movieName}`}
          src={embedUrl}
          className="h-full w-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
        Đang phát: {movieName} - {tap}
      </p>
    </div>
  );
}
