export const fetchTopRatedMovies = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDUyNjRlYmI4ZTYyODVhYjlkYjQ1ZDdlYmVjZmM2YiIsInN1YiI6IjY2NmQ0OTU0NmI4YzQ3OTQ1YTM2MzVhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QjBCWACkZDu3OnmyGtfkhcD6oBs-eWez0VgPH7PR6w0',
    },
  };

  fetch(
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
    options,
  )
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
};
