import {
  FavoriteRequestBody,
  SignOutRequestBody,
  WatchlistRequestBody,
} from '../constants/AppInterfaces';
import Storage from '../utilities/Storage';
import {terminateUserSession} from '../utilities/App';
import {SIMILAR_MOVIE_ID} from '../data/Main';
const ReadAccessToken = process.env.READ_ACCESS_TOKEN;

enum RequestMethod {
  'GET' = 'GET',
  'POST' = 'POST',
  'DELETE' = 'DELETE',
}

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

async function fetchJson(url: string, options: RequestOptions) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status} - ${response.statusText}`;
      if (response.status === 401) {
        terminateUserSession();
        errorMessage = 'Unauthorized access';
      }
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (error) {
    console.error('Error during fetch operation:', error);
  }
}

function createRequestOptions(
  method: string,
  header: any,
  accessToken?: string,
  body?: any,
  signal?: AbortSignal,
): RequestOptions {
  const headers: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/json',
    ...header,
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  };
}

// # v4 apis:-
export const createRequestTokenV4 = async (signal: AbortSignal) => {
  const url = 'https://api.themoviedb.org/4/auth/request_token';
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.POST,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const createAccessTokenV4 = async (
  signal: AbortSignal,
  request_token: string,
) => {
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const body = {request_token};
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.POST,
    headers,
    ReadAccessToken,
    body,
    signal,
  );
  return fetchJson(url, options);
};

export const expireAccessTokenV4 = async (body: SignOutRequestBody) => {
  const accessToken: string | undefined = body.access_token;
  if (!accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const headers = {};
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const options = createRequestOptions(
    RequestMethod.DELETE,
    headers,
    ReadAccessToken,
    body,
  );
  return fetchJson(url, options);
};

export const fetchMovieFavoritesV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/favorites?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchMovieWatchlistV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/watchlist?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchRecommendedMoviesV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/recommendations?language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

// # v3 apis:-
export const fetchPopularMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchSearchedMovieResults = async (
  signal: AbortSignal,
  searchedText: string,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchedText}&language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchTrendingMovies = async (signal: AbortSignal) => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchNowPlayingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchUpcomingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchTopRatedMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchMovieDetails = async (
  signal: AbortSignal,
  movieId: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    ReadAccessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

// ? deprecated
export const fetchMovieFavorites = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

// ? deprecated
export const fetchMovieWatchlist = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

// ? deprecated
export const updateMovieFavorites = async (body: FavoriteRequestBody) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.POST,
    headers,
    accessToken,
    body,
  );
  return fetchJson(url, options);
};

// ? deprecated
export const updateMovieWatchlist = async (body: WatchlistRequestBody) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.POST,
    headers,
    accessToken,
    body,
  );
  return fetchJson(url, options);
};

// ? deprecated
export const fetchAccountDetails = async (signal: AbortSignal) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

// ? deprecated
export const fetchMoviesRated = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/rated?page=${pageParam}&language=en-US`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchSimilarMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  const url = `https://api.themoviedb.org/3/movie/${SIMILAR_MOVIE_ID}/similar?language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const fetchMovieReviews = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const userStorage = Storage.getUserStorageInstance();
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  const url = `https://api.themoviedb.org/3/movie/${SIMILAR_MOVIE_ID}/reviews?language=en-US&page=${pageParam}`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.GET,
    headers,
    accessToken,
    null,
    signal,
  );
  return fetchJson(url, options);
};

export const addMovieRating = async ({
  movieId,
  value,
}: {
  movieId: number;
  value: number;
}) => {
  const userStorage = Storage.getUserStorageInstance();
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
  const body = {value};
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };
  const options = createRequestOptions(
    RequestMethod.POST,
    headers,
    accessToken,
    body,
  );
  return fetchJson(url, options);
};

export const deleteMovieRating = async (movieId: number) => {
  const userStorage = Storage.getUserStorageInstance();
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
  const headers = {};
  const options = createRequestOptions(
    RequestMethod.DELETE,
    headers,
    accessToken,
    null,
  );
  return fetchJson(url, options);
};
