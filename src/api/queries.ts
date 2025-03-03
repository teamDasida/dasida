// queries.ts

import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { AxiosError } from 'axios'; // 추가
import apiClient from './client';

const fetchResource = async <T>(url: string): Promise<T> => {
  const { data } = await apiClient.get(url);
  return data;
};

// Error -> AxiosError
export const useResource = <T>(
  url: string, 
  queryKey: string[], 
  options?: UseQueryOptions<T, AxiosError, T, QueryKey>
) => {
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: () => fetchResource<T>(url),
    ...options
  });
};
