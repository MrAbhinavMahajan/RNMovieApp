import {
  FavoriteRequestBody,
  WatchlistRequestBody,
} from '../constants/AppInterfaces';
const AuthToken = process.env.AUTH_KEY;

export const requestAccessToken = async (signal: AbortSignal) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/authentication/token/new',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const json = await response.json();
  return json;
};

export const createNewSession = async (signal: AbortSignal) => {
  // user has validated the request token via webview - https://www.themoviedb.org/authenticate/<REQUEST_TOKEN>?redirect_to=http://www.yourapp.com/approved
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
    'https://api.themoviedb.org/3/authentication/session/new',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const json = await response.json();
  return json;
};

export const validateSessionWithLogin = async (
  signal: AbortSignal,
  username: string,
  password: string,
  request_token: string,
) => {
  // registered user
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify({username, password, request_token}),
    signal,
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/authentication/token/validate_with_login',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const json = await response.json();
  return json;
};

export const deleteUserSession = async (
  signal: AbortSignal,
  session_id: string,
) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    body: JSON.stringify({session_id}),
    signal,
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/authentication/session',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }

  const json = await response.json();
  return json;
};

/////

export const fetchTrendingMovies = async (signal: AbortSignal) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
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
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}`,
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
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageParam}`,
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
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageParam}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies');
  }

  const json = await response.json();
  return json;
};

export const fetchRecommendedMovies = async (
  signal: AbortSignal,
  movieId: number,
  pageParam: number,
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=${pageParam}`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recommended movies');
  }

  const json = await response.json();
  return json;
};

export const fetchPopularMovies = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}`,
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
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchedText}&language=en-US&page=${pageParam}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch search results for ${searchedText}`);
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
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details for ${movieId}`);
  }

  const json = await response.json();
  return json;
};

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

export const fetchMovieFavorites = async (
  signal: AbortSignal,
  pageParam: number,
) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/account/null/favorite/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`,
    options,
  );

  if (!response.ok) {
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
      Authorization: `Bearer ${AuthToken}`,
    },
    signal,
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/account/null/watchlist/movies?language=en-US&page=${pageParam}&sort_by=created_at.desc`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Watchlist');
  }

  const json = await response.json();
  return json;
};
