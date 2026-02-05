-- Lan2tenPhim - PostgreSQL Schema
-- Chạy: psql -U postgres -d lan2tenphim -f database/schema.sql

-- Bảng người dùng (khi bật tính năng đăng nhập)
CREATE TABLE IF NOT EXISTS users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name       VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

-- Bảng phim yêu thích (slug tham chiếu API OPhim)
CREATE TABLE IF NOT EXISTS favorites (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phim_slug  VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, phim_slug)
);

CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_phim_slug ON favorites(phim_slug);

-- Bảng lịch sử xem
CREATE TABLE IF NOT EXISTS watch_history (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  phim_slug             VARCHAR(255) NOT NULL,
  episode_name          VARCHAR(255),
  episode_index         INT,
  last_position_seconds INT NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_watch_history_user_phim ON watch_history(user_id, phim_slug);
CREATE INDEX idx_watch_history_updated_at ON watch_history(updated_at DESC);

-- Bảng cache API (tùy chọn - giảm gọi OPhim)
CREATE TABLE IF NOT EXISTS api_cache (
  cache_key     VARCHAR(512) PRIMARY KEY,
  response_json JSONB NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_api_cache_expires_at ON api_cache(expires_at);

-- Trigger cập nhật updated_at cho users
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON users;
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

DROP TRIGGER IF EXISTS watch_history_updated_at ON watch_history;
CREATE TRIGGER watch_history_updated_at
  BEFORE UPDATE ON watch_history
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
