import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        404 - Không tìm thấy
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        Trang hoặc phim bạn tìm không tồn tại.
      </p>
      <Link
        href="/"
        className="rounded bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
