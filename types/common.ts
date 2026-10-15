export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface ApiErrorShape {
  message: string;
  status: number;
  code?: string;
  fieldErrors?: Record<string, string[]>;
}
