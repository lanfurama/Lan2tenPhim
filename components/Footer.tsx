import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            Lan2tenPhim
          </Link>
          <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <Link href="/danh-sach/phim-moi" className="hover:underline">
              Phim mới
            </Link>
            <Link href="/danh-sach/phim-bo" className="hover:underline">
              Phim bộ
            </Link>
            <Link href="/danh-sach/phim-le" className="hover:underline">
              Phim lẻ
            </Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
          Dữ liệu phim từ API bên thứ ba. Chỉ dùng cho mục đích học tập.
        </p>
      </div>
    </footer>
  );
}
