export interface QueryClientProps {
  data: any; // Api Response
  dataUpdatedAt: number;
  error: Error;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  failureCount: number;
  failureReason: null;
  fetchStatus: string;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isFetching: boolean;
  isInitialLoading: boolean;
  isLoading: boolean;
  isLoadingError: boolean;
  isPaused: boolean;
  isPending: boolean;
  isPlaceholderData: boolean;
  isRefetchError: boolean;
  isRefetching: boolean;
  isStale: boolean;
  isSuccess: boolean;
  status: string;
  refetch: () => void;
}
