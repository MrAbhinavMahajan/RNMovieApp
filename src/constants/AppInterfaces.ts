export interface ILogger {
  log: (message: string) => void;
}

export interface ILoggerFactory {
  createLogger: () => ILogger;
}

export interface Tmdb {
  avatar_path: null;
}

export interface Avatar {
  tmdb: Tmdb;
}

export interface AccountDetails {
  id: number;
  name: string;
  username: string;
  avatar: Avatar;
  include_adult: boolean;
}

export interface QueryClientProps {
  data: any; // Api Response
  dataUpdatedAt: number;
  error: Error;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  failureCount: number;
  failureReason: null;
  fetchStatus: string;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isInitialLoading: boolean;
  isLoading: boolean;
  isLoadingError: boolean;
  isPaused: boolean;
  isPending: boolean;
  isPlaceholderData: boolean;
  isRefetchError: boolean;
  isRefetching: boolean;
  isStale: boolean;
  isSuccess: boolean;
  status: string;
  refetch: () => void;
}

export interface FavoriteRequestBody {
  media_type: string;
  media_id: number;
  favorite: boolean;
}

export interface WatchlistRequestBody {
  media_type: string;
  media_id: number;
  watchlist: boolean;
}

export interface SignOutRequestBody {
  access_token: string;
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
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

export interface MoviePosterItem {
  poster_path: string;
  backdrop_path: string;
  title: string;
  id: number;
}

export interface DiscoverMoviePayload {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}

export interface QueryParams {
  page?: number;
  year?: number;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  sort_by?: string;
}

export interface DiscoverQueryParams extends QueryParams {
  with_genres: string;
  region?: string;
}

export interface Genres {
  id: number;
  name: string;
}

export enum MovieCarouselTypes {
  'BANNER' = 'BANNER',
  'POSTER' = 'POSTER',
}

export type MovieCarouselParams = {
  data: MovieItem[];
  itemAction: (item: MovieItem) => void;
  autoPlay?: boolean;
  autoPlayTimer?: number;
};
