# Lan2tenPhim

Web xem phim sử dụng API OPhim (ophim1.com), xây bằng Next.js 16 (App Router) + Tailwind CSS.

## Yêu cầu

- Node.js 18+
- (Tùy chọn) PostgreSQL khi bật tính năng user/favorites

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Biến môi trường

Tạo file `.env.local` (đã có sẵn `.env.example`):

- `OPHIM_BASE_URL` – Base URL API (mặc định: https://ophim1.com)
- `OPHIM_CDN_IMAGE` – CDN ảnh poster (mặc định: https://img.ophim.live)

## Database (tùy chọn)

Khi cần đăng nhập, yêu thích, lịch sử xem:

```bash
createdb lan2tenphim
psql -U postgres -d lan2tenphim -f database/schema.sql
```

## Cấu trúc chính

- `app/` – Trang & API routes
  - `app/api/home`, `app/api/danh-sach/[slug]`, `app/api/phim/[slug]` – Proxy OPhim
  - `app/page.tsx` – Trang chủ (phim mới)
  - `app/danh-sach/[slug]/page.tsx` – Danh sách theo thể loại (bộ lọc, phân trang)
  - `app/phim/[slug]/page.tsx` – Chi tiết phim + danh sách tập
  - `app/xem/page.tsx` – Trang xem phim (iframe)
- `components/` – Header, Footer, MovieCard
- `lib/ophim.ts` – Helper gọi API & URL poster
- `types/ophim.ts` – TypeScript types cho response API
- `database/schema.sql` – Schema PostgreSQL (users, favorites, watch_history, api_cache)

## Scripts

- `npm run dev` – Chạy dev (Turbopack)
- `npm run build` – Build production
- `npm run start` – Chạy production
