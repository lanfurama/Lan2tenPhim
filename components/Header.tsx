import Link from "next/link";

const NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Phim mới", href: "/danh-sach/phim-moi" },
  { label: "Phim bộ", href: "/danh-sach/phim-bo" },
  { label: "Phim lẻ", href: "/danh-sach/phim-le" },
  { label: "TV Shows", href: "/danh-sach/tv-shows" },
  { label: "Hoạt hình", href: "/danh-sach/hoat-hinh" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold text-zinc-900 dark:text-zinc-100"
        >
          Lan2tenPhim
        </Link>
        <form
          action="/tim-kiem"
          method="get"
          className="flex shrink-0 basis-[200px] items-center gap-1 md:basis-[240px]"
        >
          <input
            type="search"
            name="keyword"
            placeholder="Tìm phim..."
            className="w-full rounded-l border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white dark:border-zinc-600 dark:bg-zinc-800 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:bg-zinc-900"
            aria-label="Tìm kiếm phim"
          />
          <button
            type="submit"
            className="rounded-r border border-l-0 border-zinc-200 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
          >
            Tìm
          </button>
        </form>
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none md:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded px-3 py-1.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
