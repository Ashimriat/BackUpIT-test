export interface MovieShort {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieFull {
  adult: boolean;
  backdrop_path: string;
  belong_to_collection: any;
  genres: Array<Genre>;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<CountryLanguage>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<CountryLanguage>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface FavouriteMovie {
  id: number;
  title: string;
}

export interface MoviesList {
  page: number;
  results: Array<MovieShort>;
  total_results: number;
  total_pages: number;
}

export interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface CountryLanguage {
  iso_3166_1: string;
  name: string;
}
