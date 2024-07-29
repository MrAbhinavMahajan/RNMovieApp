import {
  DiscoverQueryParams,
  FavoriteRequestBody,
  SignOutRequestBody,
  WatchlistRequestBody,
} from '@constants/AppInterfaces';
import Storage from '@utilities/Storage';
import {getAppStoreState} from '@store/useSessionStore';
import {MMKV} from 'react-native-mmkv';
import {logDebug, logError} from '../analytics';
import {APP_BASE_URL} from '../constants/Api';
import {getMovieStoreState} from '../store/useMovieStore';
const ReadAccessToken = process.env.TMDB_READ_ACCESS_TOKEN;

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

function expireSession(): void {
  const {isSignedIn, logout} = getAppStoreState();
  if (isSignedIn) {
    logout();
  }
}

function generateQueryParams(params: any): string {
  const queryString = Object.keys(params)
    .map(key => {
      const value = params[key];
      if (Array.isArray(value)) {
        return value
          .map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          .join('&');
      } else if (typeof value === 'object' && value !== null) {
        return generateQueryParams(value);
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
    })
    .join('&');
  return '?' + queryString;
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

function getUserStorageData() {
  const userStorage: MMKV | null = Storage.getUserStorageInstance();
  const accountId: string | undefined = userStorage?.getString('accountId');
  const accessToken: string | undefined = userStorage?.getString('accessToken');
  return {accountId, accessToken};
}

async function fetchJson(url: string, options: RequestOptions): Promise<any> {
  try {
    logDebug(`[API_REQUEST] ${JSON.stringify({url, options})}`);
    const response = await fetch(url, options);
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status} - ${response.statusText}`;
      if (response.status === 401) {
        expireSession();
        errorMessage = 'Unauthorized access';
      }
      throw new Error(errorMessage);
    }

    const responseJson = await response.json();
    logDebug(`[API_RESPONSE] ${JSON.stringify({url, responseJson})}`);
    return responseJson;
  } catch (error: any) {
    if (error?.title === 'AbortError') {
      return;
    }
    logError(`FETCH FAILED: ${error}`);
    throw new Error(error);
  }
}

async function fetchJsonWithoutAuth(
  url: string,
  method: RequestMethod,
  body?: any,
  signal?: AbortSignal,
): Promise<any> {
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
): Promise<any> {
  const {accessToken} = getUserStorageData();
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
export const createRequestTokenV4 = async (
  signal: AbortSignal,
): Promise<any> => {
  const url = `${APP_BASE_URL}/4/auth/request_token`;
  const method = RequestMethod.POST;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const createAccessTokenV4 = async (
  signal: AbortSignal,
  request_token: string,
): Promise<any> => {
  const url = `${APP_BASE_URL}/4/auth/access_token`;
  const body = {request_token};
  const method = RequestMethod.POST;
  return fetchJsonWithoutAuth(url, method, body, signal);
};

export const expireAccessTokenV4 = async (
  body: SignOutRequestBody,
): Promise<any> => {
  const accessToken: string | undefined = body.access_token;
  if (!accessToken) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/4/auth/access_token`;
  const method = RequestMethod.DELETE;
  return fetchJsonWithoutAuth(url, method, null);
};

export const fetchMovieFavoritesV4 = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/4/account/${accountId}/movie/favorites?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchMovieWatchlistV4 = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/4/account/${accountId}/movie/watchlist?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchRecommendedMoviesV4 = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/4/account/${accountId}/movie/recommendations?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// # v3 apis:-
export const fetchPopularMovies = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const url = `${APP_BASE_URL}/3/movie/popular?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchSearchedMovieResults = async (
  signal: AbortSignal,
  searchedText: string,
  pageParam: number,
): Promise<any> => {
  const url = `${APP_BASE_URL}/3/search/movie?query=${searchedText}&language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchTrendingMovies = async (
  signal: AbortSignal,
): Promise<any> => {
  const url = `${APP_BASE_URL}/3/trending/movie/day?language=en-US`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchNowPlayingMovies = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const url = `${APP_BASE_URL}/3/movie/now_playing?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchUpcomingMovies = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const url = `${APP_BASE_URL}/3/movie/upcoming?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchTopRatedMovies = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const url = `${APP_BASE_URL}/3/movie/top_rated?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

export const fetchMovieDetails = async (
  signal: AbortSignal,
  movieId: number,
): Promise<any> => {
  const url = `${APP_BASE_URL}/3/movie/${movieId}?language=en-US`;
  const method = RequestMethod.GET;
  return fetchJsonWithoutAuth(url, method, null, signal);
};

// ? deprecated
export const fetchMovieFavorites = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/3/account/${accountId}/favorite/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// ? deprecated
export const fetchMovieWatchlist = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/3/account/${accountId}/watchlist/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// ? deprecated
export const updateMovieFavorites = async (
  body: FavoriteRequestBody,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/3/account/${accountId}/favorite`;
  const method = RequestMethod.POST;
  return fetchJsonWithAuth(url, method, body);
};

// ? deprecated
export const updateMovieWatchlist = async (
  body: WatchlistRequestBody,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/3/account/${accountId}/watchlist`;
  const method = RequestMethod.POST;
  return fetchJsonWithAuth(url, method, body);
};

// ? deprecated
export const fetchAccountDetails = async (
  signal: AbortSignal,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/3/account/${accountId}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

// ? deprecated
export const fetchMoviesRated = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {accountId} = getUserStorageData();
  if (!accountId) {
    // ! Unauthorized access
    expireSession();
    return;
  }
  const url = `${APP_BASE_URL}/4/account/${accountId}/movie/rated?page=${pageParam}&language=en-US&sort_by=created_at.desc`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchSimilarMovies = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {lastWatchedMovieId} = getMovieStoreState();
  const url = `${APP_BASE_URL}/3/movie/${lastWatchedMovieId}/similar?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchMovieReviews = async (
  signal: AbortSignal,
  pageParam: number,
): Promise<any> => {
  const {lastWatchedMovieId} = getMovieStoreState();
  const url = `${APP_BASE_URL}/3/movie/${lastWatchedMovieId}/reviews?language=en-US&page=${pageParam}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const addMovieRating = async ({
  movieId,
  value,
}: {
  movieId: number;
  value: number;
}): Promise<any> => {
  const url = `${APP_BASE_URL}/3/movie/${movieId}/rating`;
  const body = {value};
  const method = RequestMethod.POST;
  return fetchJsonWithAuth(url, method, body);
};

export const deleteMovieRating = async (movieId: number): Promise<any> => {
  const url = `${APP_BASE_URL}/3/movie/${movieId}/rating`;
  const method = RequestMethod.DELETE;
  return fetchJsonWithAuth(url, method, null);
};

export const fetchDiscoverMovies = async (
  signal: AbortSignal,
  params: DiscoverQueryParams,
): Promise<any> => {
  const defaultParams = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    sort_by: 'popularity.desc',
  };
  const queryParams = generateQueryParams(
    Object.assign({}, params, defaultParams),
  );
  const url = `${APP_BASE_URL}/3/discover/movie${queryParams}`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};

export const fetchMovieGenres = async (signal: AbortSignal): Promise<any> => {
  const url = `${APP_BASE_URL}/3/genre/movie/list?language=en-US`;
  const method = RequestMethod.GET;
  return fetchJsonWithAuth(url, method, null, signal);
};
