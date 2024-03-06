export interface PaginationOptions {
  page?: number;
  size?: number;
}

export interface PaginatedOutput<T> {
  data: T[];
  meta: {
    page: number;
    size: number;
    total: number;
  };
}
