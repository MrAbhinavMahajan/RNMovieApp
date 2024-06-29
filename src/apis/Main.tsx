import {
  FavoriteRequestBody,
  WatchlistRequestBody,
} from '../constants/AppInterfaces';
import {SecuredStorage} from '../constants/Storage';
import {terminateUserSession} from '../utilities/AppUtils';
const ReadAccessToken = process.env.READ_ACCESS_TOKEN;

// # v4 apis:-
export const createRequestTokenV4 = async (signal: AbortSignal) => {
  const url = 'https://api.themoviedb.org/4/auth/request_token';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to create Request Token');
  }
  const json = await response.json();
  return json;
};

export const createAccessTokenV4 = async (
  signal: AbortSignal,
  request_token?: string,
) => {
  let requestToken: string | undefined | null = null;
  if (!request_token) {
    requestToken = SecuredStorage.getString('requestToken');
  } else {
    requestToken = request_token;
  }
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    body: JSON.stringify({request_token: requestToken}),
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to create Access Token');
  }
  const json = await response.json();
  return json;
};

export const expireAccessTokenV4 = async (signal: AbortSignal) => {
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    body: JSON.stringify({access_token: accessToken}),
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to expire Access Token');
  }
  const json = await response.json();
  return json;
};

export const fetchMovieFavoritesV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/favorites?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to fetch Favorites');
  }
  const json = await response.json();
  return json;
};

export const fetchMovieWatchlistV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/watchlist?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to fetch Watchlist');
  }
  const json = await response.json();
  return json;
};

export const fetchRecommendedMoviesV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  const url = `https://api.themoviedb.org/4/account/${accountId}/movie/recommendations?language=en-US&page=${pageParam}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to fetch Recommended Movies');
  }
  const json = await response.json();
  return json;
};

// # v3 apis:-
export const fetchPopularMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch Popular Movies');
  }
  const json = await response.json();
  return json;
};

export const fetchSearchedMovieResults = async (
  signal: AbortSignal,
  searchedText: string,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchedText}&language=en-US&page=${pageParam}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch Search Results for ${searchedText}`);
  }
  const json = await response.json();
  return json;
};

export const fetchTrendingMovies = async (signal: AbortSignal) => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch Trending Movies');
  }
  const json = await response.json();
  return json;
};

export const fetchNowPlayingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch Now Playing Movies');
  }
  const json = await response.json();
  return json;
};

export const fetchUpcomingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageParam}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch Upcoming Movies');
  }
  const json = await response.json();
  return json;
};

export const fetchTopRatedMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch Top Rated Movies');
  }
  const json = await response.json();
  return json;
};

export const fetchMovieDetails = async (
  signal: AbortSignal,
  movieId: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ReadAccessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch Movie Details for ${movieId}`);
  }
  const json = await response.json();
  return json;
};

// ? deprecated
export const fetchMovieFavorites = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to fetch Favorites');
  }
  const json = await response.json();
  return json;
};

// ? deprecated
export const fetchMovieWatchlist = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to fetch Watchlist');
  }
  const json = await response.json();
  return json;
};

// ? deprecated
export const updateMovieFavorites = async (body: FavoriteRequestBody) => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to update Favorites');
  }
  const json = await response.json();
  return json;
};

// ? deprecated
export const updateMovieWatchlist = async (body: WatchlistRequestBody) => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to update Watchlist');
  }
  const json = await response.json();
  return json;
};

// ? deprecated
export const fetchAccountDetails = async () => {
  const accountId: Object | undefined = SecuredStorage.getString('accountId');
  const accessToken: string | undefined =
    SecuredStorage.getString('accessToken');
  if (!accountId || !accessToken) {
    // ! Unauthorized access
    terminateUserSession();
    return;
  }
  const url = `https://api.themoviedb.org/3/account/${accountId}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response?.status === 401) {
      // ! Unauthorized access
      terminateUserSession();
      return;
    }
    throw new Error('Failed to fetch Account Details');
  }
  const json = await response.json();
  return json;
};
