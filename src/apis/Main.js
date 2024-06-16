const AccessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDUyNjRlYmI4ZTYyODVhYjlkYjQ1ZDdlYmVjZmM2YiIsInN1YiI6IjY2NmQ0OTU0NmI4YzQ3OTQ1YTM2MzVhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjBCWACkZDu3OnmyGtfkhcD6oBs-eWez0VgPH7PR6w0';

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
