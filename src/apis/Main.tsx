import {
  FavoriteRequestBody,
  WatchlistRequestBody,
} from '../constants/AppInterfaces';

const AccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDUyNjRlYmI4ZTYyODVhYjlkYjQ1ZDdlYmVjZmM2YiIsInN1YiI6IjY2NmQ0OTU0NmI4YzQ3OTQ1YTM2MzVhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjBCWACkZDu3OnmyGtfkhcD6oBs-eWez0VgPH7PR6w0';

export const fetchTrendingMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
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

export const fetchNowPlayingMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch now playing movies');
  }

  const json = await response.json();
  return json;
};

export const fetchUpcomingMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }

  const json = await response.json();
  return json;
};

export const fetchTopRatedMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch top rated movies');
  }

  const json = await response.json();
  return json;
};

export const fetchRecommendedMovies = async (movieId: number) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recommended movies');
  }

  const json = await response.json();
  return json;
};

export const fetchPopularMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }

  const json = await response.json();
  return json;
};

export const fetchSearchedMovieResults = async (searchedText: string) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchedText}&language=en-US&page=1`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch search results for ${searchedText}`);
  }

  const json = await response.json();
  return json;
};

export const fetchMovieDetails = async (movieId: number) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
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
      Authorization: `Bearer ${AccessToken}`,
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
      Authorization: `Bearer ${AccessToken}`,
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

export const fetchMovieFavorites = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/account/null/favorite/movies?language=en-US&page=1&sort_by=created_at.asc',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Favorites');
  }

  const json = await response.json();
  return json;
};

export const fetchMovieWatchlist = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${AccessToken}`,
    },
  };

  const response = await fetch(
    'https://api.themoviedb.org/3/account/null/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc',
    options,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Watchlist');
  }

  const json = await response.json();
  return json;
};
