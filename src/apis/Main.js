export const fetchTopRatedMovies = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
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
