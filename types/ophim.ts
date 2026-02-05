export interface OPhimCategory {
  id: string;
  name: string;
  slug: string;
}

export interface OPhimCountry {
  id: string;
  name: string;
  slug: string;
}

export interface OPhimMovieItem {
  _id: string;
  name: string;
  slug: string;
  origin_name?: string;
  thumb_url?: string;
  type?: string;
  episode_current?: string;
  quality?: string;
  lang?: string;
  year?: number;
  time?: string;
  category?: OPhimCategory[];
  country?: OPhimCountry[];
}

export interface OPhimHomeData {
  seoOnPage?: {
    titleHead?: string;
    descriptionHead?: string;
    og_image?: string[];
  };
  items: OPhimMovieItem[];
  params?: {
    pagination?: {
      totalItems: number;
      totalItemsPerPage: number;
      currentPage: number;
      pageRanges: number;
    };
  };
  type_list?: string;
  APP_DOMAIN_CDN_IMAGE?: string;
}

export interface OPhimHomeResponse {
  status: string;
  message: string;
  data: OPhimHomeData;
}

export interface OPhimListParams {
  page?: number;
  limit?: number;
  sort_field?: string;
  sort_type?: "asc" | "desc";
  category?: string;
  country?: string;
  year?: string;
}

export interface OPhimEpisodeServerItem {
  name: string;
  slug: string;
  link_embed?: string;
  filename?: string;
}

export interface OPhimEpisode {
  server_name?: string;
  server_data?: OPhimEpisodeServerItem[];
}

/** Movie object as returned by OPhim (in both data.movie and data.item) */
export interface OPhimMovieDetailFields {
  _id: string;
  name: string;
  slug: string;
  origin_name?: string;
  thumb_url?: string;
  poster_url?: string;
  type?: string;
  episode_current?: string;
  quality?: string;
  lang?: string;
  year?: number;
  time?: string;
  category?: OPhimCategory[];
  country?: OPhimCountry[];
  modified?: { time: string };
  created?: { time: string };
  description?: string;
  content?: string;
  episodes?: OPhimEpisode[];
}

export interface OPhimMovieDetail {
  /** Legacy: một số phiên bản API trả về movie */
  movie?: OPhimMovieDetailFields;
  /** Cấu trúc thực tế API OPhim: phim nằm trong data.item, episodes trong item.episodes */
  item?: OPhimMovieDetailFields & { episodes?: OPhimEpisode[] };
  episodes?: OPhimEpisode[];
}

export interface OPhimDetailResponse {
  status: string;
  message: string;
  data: OPhimMovieDetail;
}
