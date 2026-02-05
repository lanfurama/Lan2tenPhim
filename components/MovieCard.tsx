import { posterUrl } from "@/lib/ophim";
import type { OPhimMovieItem } from "@/types/ophim";
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  movie: OPhimMovieItem;
}

export function MovieCard({ movie }: MovieCardProps) {
  const href = `/phim/${movie.slug}`;
  const poster = posterUrl(movie.thumb_url);

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-700">
        <Image
          src={poster}
          alt={movie.name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
          {movie.quality ?? "HD"}
        </div>
        {movie.episode_current && (
          <div className="absolute left-1 top-1 rounded bg-red-600/90 px-1.5 py-0.5 text-xs text-white">
            {movie.episode_current}
          </div>
        )}
      </div>
      <div className="p-2.5">
        <h3 className="line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {movie.name}
        </h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          {movie.year && <span>{movie.year}</span>}
          {movie.lang && <span>• {movie.lang}</span>}
        </p>
      </div>
    </Link>
  );
}
