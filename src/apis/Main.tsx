import {
  FavoriteRequestBody,
  WatchlistRequestBody,
} from '../constants/AppInterfaces';
import {terminateSession} from '../utilities/AppUtils';
const APIKey = process.env.API_KEY;
const AuthToken = process.env.AUTH_KEY;

// ? Store in secured storage
const accountId: Object = '';
const accessToken: string = '';

// # v4 apis:-
export const createRequestTokenV4 = async (signal: AbortSignal) => {
  const url = 'https://api.themoviedb.org/4/auth/request_token';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  const json = await response.json();
  return json;
};

export const createAccessTokenV4 = async (
  signal: AbortSignal,
  request_token: string,
) => {
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify({request_token}),
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  const json = await response.json();
  return json;
};

export const expireAccessTokenV4 = async (
  signal: AbortSignal,
  access_token: string,
) => {
  const url = 'https://api.themoviedb.org/4/auth/access_token';
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({access_token}),
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  const json = await response.json();
  return json;
};

export const fetchMovieFavoritesV4 = async (
  signal: AbortSignal,
  pageParam: number,
) => {
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
      terminateSession();
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
      terminateSession();
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
      terminateSession();
      return;
    }
    throw new Error('Failed to fetch recommended movies');
  }
  const json = await response.json();
  return json;
};

// ? Change to v4 to toggle
export const updateMovieFavorites = async (body: FavoriteRequestBody) => {
  const url = 'https://api.themoviedb.org/3/account/null/favorite';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to update Favorites');
  }
  const json = await response.json();
  return json;
};

export const updateMovieWatchlist = async (body: WatchlistRequestBody) => {
  const url = 'https://api.themoviedb.org/3/account/null/watchlist';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to update Watchlist');
  }
  const json = await response.json();
  return json;
};

// # v3 apis:-
export const fetchPopularMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}&api_key=${APIKey}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  const json = await response.json();
  return json;
};

export const fetchSearchedMovieResults = async (
  signal: AbortSignal,
  searchedText: string,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchedText}&language=en-US&page=${pageParam}&api_key=${APIKey}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch search results for ${searchedText}`);
  }
  const json = await response.json();
  return json;
};

export const fetchTrendingMovies = async (signal: AbortSignal) => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${APIKey}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  const json = await response.json();
  return json;
};

export const fetchNowPlayingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}&api_key=${APIKey}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch now playing movies');
  }
  const json = await response.json();
  return json;
};

export const fetchUpcomingMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageParam}&api_key=${APIKey}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  const json = await response.json();
  return json;
};

export const fetchTopRatedMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}&api_key=${APIKey}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies');
  }
  const json = await response.json();
  return json;
};

export const fetchMovieDetails = async (
  signal: AbortSignal,
  movieId: number,
) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${APIKey}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ${movieId}`);
  }
  const json = await response.json();
  return json;
};
