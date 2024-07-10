import {
  FavoriteRequestBody,
  SignOutRequestBody,
  WatchlistRequestBody,
} from '@constants/AppInterfaces';
import Storage from '@utilities/Storage';
import {getAppStoreState} from '@store/useAppStore';
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

function expireSession() {
  const {isSignedIn, logout} = getAppStoreState();
  if (isSignedIn) {
    logout();
  }
}

function createRequestOptions(
  method: string,
  headers: any,
  accessToken?: string,
  body?: any,
  signal?: AbortSignal,
): RequestOptions {
  const defaultHeaders: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/json',
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  };
}

function getUserStorageAndToken() {
  const userStorage = Storage.getUserStorageInstance();
  const accountId: Object | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  return {userStorage, accountId, accessToken};
}

async function fetchJson(url: string, options: RequestOptions) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status} - ${response.statusText}`;
      if (response.status === 401) {
        expireSession();
        errorMessage = 'Unauthorized access';
      }
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (error: Error | any) {
    console.error('Error during fetch operation:', error);
    if (error?.title === 'AbortError') {
      return;
    }
    throw new Error(error);
  }
}

async function fetchJsonWithoutAuth(
  url: string,
  method: RequestMethod,
  body?: any,
  signal?: AbortSignal,
) {
  const headers = {};
  const options = createRequestOptions(
    method,
    headers,
    ReadAccessToken,
    body,
    signal,
  );
  return fetchJson(url, options);
}

async function fetchJsonWithAuth(
  url: string,
  method: RequestMethod,
  body?: any,
  signal?: AbortSignal,
) {
  const {accessToken} = getUserStorageAndToken();
  if (!accessToken) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const headers = {};
  const options = createRequestOptions(
    method,
    headers,
    accessToken,
    body,
    signal,
  );
  return fetchJson(url, options);
}

// # v4 apis:-
export const createRequestTokenV4 = async (signal: AbortSignal) => {
  const url = 'https://api.themoviedb.org/4/auth/request_token';
  const method = RequestMethod.POST;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const createAccessTokenV4 = async (
  signal: AbortSignal,
  request_token: string,
) => {
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const body = {request_token};
  const method = RequestMethod.POST;
  return fetchJsonWithoutAuth(url, method, body, signal);
};

export const expireAccessTokenV4 = async (body: SignOutRequestBody) => {
  const accessToken: string | undefined = body.access_token;
  if (!accessToken) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const method = RequestMethod.DELETE;
  return fetchJsonWithoutAuth(url, method, null);
};

export const fetchMovieFavoritesV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/favorites?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchMovieWatchlistV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/watchlist?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchRecommendedMoviesV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/recommendations?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// # v3 apis:-
export const fetchPopularMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchSearchedMovieResults = async (
  signal: AbortSignal,
  searchedText: string,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchedText}&language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchTrendingMovies = async (signal: AbortSignal) => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchNowPlayingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchUpcomingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchTopRatedMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchMovieDetails = async (
  signal: AbortSignal,
  movieId: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

// ? deprecated
export const fetchMovieFavorites = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// ? deprecated
export const fetchMovieWatchlist = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// ? deprecated
export const updateMovieFavorites = async (body: FavoriteRequestBody) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite`;
  const method = RequestMethod.POST;
  return fetchJsonWithAuth(url, method, body);
};

// ? deprecated
export const updateMovieWatchlist = async (body: WatchlistRequestBody) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;
  const method = RequestMethod.POST;
  return fetchJsonWithAuth(url, method, body);
};

// ? deprecated
export const fetchAccountDetails = async (signal: AbortSignal) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// ? deprecated
export const fetchMoviesRated = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {accountId} = getUserStorageAndToken();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/rated?page=${pageParam}&language=en-US&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchSimilarMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {lastWatchedMovieId} = getAppStoreState();
  const url = `https://api.themoviedb.org/3/movie/${lastWatchedMovieId}/similar?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchMovieReviews = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const {lastWatchedMovieId} = getAppStoreState();
  const url = `https://api.themoviedb.org/3/movie/${lastWatchedMovieId}/reviews?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const addMovieRating = async ({
  movieId,
  value,
}: {
  movieId: number;
  value: number;
}) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
  const body = {value};
  const method = RequestMethod.POST;
  return fetchJsonWithAuth(url, method, body);
};

export const deleteMovieRating = async (movieId: number) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
  const method = RequestMethod.DELETE;
  return fetchJsonWithAuth(url, method, null);
};
