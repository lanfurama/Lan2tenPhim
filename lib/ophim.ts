const OPHIM_BASE = process.env.OPHIM_BASE_URL ?? "https://ophim1.com";
export const OPHIM_CDN = process.env.OPHIM_CDN_IMAGE ?? "https://img.ophim.live";

const PLACEHOLDER = "https://placehold.co/300x450?text=No+Image";

export function posterUrl(thumbUrl: string | undefined): string {
  if (!thumbUrl) return PLACEHOLDER;
  if (thumbUrl.startsWith("http")) return thumbUrl;
  return `${OPHIM_CDN}/uploads/movies/${thumbUrl}`;
}

export async function ophimFetch<T>(path: string, searchParams?: Record<string, string>): Promise<T> {
  const url = new URL(path, OPHIM_BASE);
  if (searchParams) {
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v != null && v !== "") url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`OPhim API error: ${res.status}`);
  return res.json() as Promise<T>;
}
