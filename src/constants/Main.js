import {QueryClient} from '@tanstack/react-query';

export const QUERY_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export const IMAGE_BASEURL = 'https://image.tmdb.org/t/p/w500';
// * Config File
