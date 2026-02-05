import { posterUrl } from "@/lib/ophim";
import type { OPhimMovieItem } from "@/types/ophim";
import Image from "next/image";
import Link from "next/link";

interface HeroBannerProps {
  movie: OPhimMovieItem;
}

export function HeroBanner({ movie }: HeroBannerProps) {
  const poster = posterUrl(movie.thumb_url);
  const categoryName = movie.category?.[0]?.name ?? "PHIM";
  const firstEpisodeHref = `/phim/${movie.slug}`;

  return (
    <section className="relative h-[55vh] min-h-[320px] w-full overflow-hidden md:h-[65vh]">
      <div className="absolute inset-0">
        <Image
          src={poster}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:left-6 md:right-auto md:max-w-xl md:p-6">
        <span className="inline-block rounded bg-white/20 px-2 py-0.5 text-xs font-medium uppercase text-white">
          {categoryName}
        </span>
        {movie.time && (
          <span className="ml-2 text-sm text-white/80">{movie.time}</span>
        )}
        <h1 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl">
          <span className="text-white">{movie.name.split(":")[0]}</span>
          {movie.name.includes(":") && (
            <span className="text-[#ec4899]">: {movie.name.split(":").slice(1).join(":")}</span>
          )}
          {!movie.name.includes(":") && movie.origin_name && (
            <span className="text-[#ec4899]"> - {movie.origin_name}</span>
          )}
        </h1>
        {movie.description && (
          <p className="mt-2 line-clamp-3 text-sm text-white/90 md:line-clamp-2">
            {movie.description}
          </p>
        )}
        <div className="mt-4 flex gap-3">
          <Link
            href={firstEpisodeHref}
            className="flex items-center gap-2 rounded-lg bg-[#ec4899] px-5 py-2.5 font-medium text-white transition hover:bg-[#f472b6]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Phát
          </Link>
          <Link
            href={firstEpisodeHref}
            className="flex items-center gap-2 rounded-lg bg-white/20 px-5 py-2.5 font-medium text-white transition hover:bg-white/30"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Danh sách của tôi
          </Link>
        </div>
      </div>
    </section>
  );
}
