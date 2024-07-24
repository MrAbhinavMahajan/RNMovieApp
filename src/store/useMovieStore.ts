import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {getZustandStateStorage} from '../utilities/Storage';
import {Genres} from '../constants/AppInterfaces';
import {logDebug} from '../analytics';

interface MovieStateProps {
  genres: Genres[];
  lastWatchedMovieId: number | null;
}

interface MovieStoreProps extends MovieStateProps {
  setGenres: (genres: Genres[]) => void;
  setLastWatchedMovieId: (lastWatchedMovieId: number) => void;
  reset: () => void;
}

const useMovieStore = create<MovieStoreProps>()(
  devtools(
    persist<MovieStoreProps>(
      set => ({
        // InitialValues
        genres: [],
        lastWatchedMovieId: null,

        // Setters
        setLastWatchedMovieId: (movieId: number) => {
          set(state => ({
            ...state,
            lastWatchedMovieId: movieId,
          }));
        },
        setGenres: (movieGenres: Genres[]) => {
          set(state => ({
            ...state,
            genres: movieGenres,
          }));
        },
        reset: () => {
          set({
            genres: [],
            lastWatchedMovieId: null,
          });
          logDebug('Movie Store Reset');
        },
      }),
      {
        name: 'movie-store',
        storage: createJSONStorage(() => getZustandStateStorage()),
      },
    ),
  ),
);

export default useMovieStore;
export const getMovieStoreState = () => useMovieStore.getState();
