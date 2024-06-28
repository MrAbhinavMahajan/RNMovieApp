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
export const createRequestToken = async (signal: AbortSignal) => {
  /**
   * Step-1 Create Request Token
   * Step-2 Redirect to Webview asking user to approve on success to approve
   * Step-3 Get Access Token
   */
  // https://www.themoviedb.org/auth/access?request_token=""
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    'https://api.themoviedb.org/4/auth/request_token',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const json = await response.json();
  return json;
};

export const createAccessToken = async (
  signal: AbortSignal,
  request_token: string,
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify({request_token}),
    signal,
  };

  const response = await fetch(
    'https://api.themoviedb.org/4/auth/access_token',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const json = await response.json();
  return json;
};

export const expireAccessToken = async (
  signal: AbortSignal,
  access_token: string,
) => {
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

  const response = await fetch(
    'https://api.themoviedb.org/4/auth/access_token',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const json = await response.json();
  return json;
};

export const fetchMovieFavorites = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/4/account/${accountId}/movie/favorites?language=en-US&page=${pageParam}&sort_by=created_at.desc`,
    options,
  );

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

export const fetchMovieWatchlist = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/4/account/${accountId}/movie/watchlist?language=en-US&page=${pageParam}&sort_by=created_at.desc`,
    options,
  );

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

export const fetchRecommendedMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/4/account/${accountId}/movie/recommendations?language=en-US&page=${pageParam}`,
    options,
  );

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
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/account/null/favorite',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to update Favorites');
  }

  const json = await response.json();
  return json;
};

export const updateMovieWatchlist = async (body: WatchlistRequestBody) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/account/null/watchlist',
    options,
  );

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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}&api_key=${APIKey}`,
    options,
  );

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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchedText}&language=en-US&page=${pageParam}&api_key=${APIKey}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch search results for ${searchedText}`);
  }

  const json = await response.json();
  return json;
};

export const fetchTrendingMovies = async (signal: AbortSignal) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${APIKey}`,
    options,
  );

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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}&api_key=${APIKey}`,
    options,
  );

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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageParam}&api_key=${APIKey}`,
    options,
  );

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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}&api_key=${APIKey}`,
    options,
  );

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
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${APIKey}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ${movieId}`);
  }

  const json = await response.json();
  return json;
};
