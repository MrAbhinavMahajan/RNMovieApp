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

export const fetchRecommendedMovies = async movieId => {
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
