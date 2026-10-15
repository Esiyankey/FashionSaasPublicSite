import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: true,
        refetchInterval: 30_000,
        refetchIntervalInBackground: false,
        retry: 1,
      },
    },
  });
}
