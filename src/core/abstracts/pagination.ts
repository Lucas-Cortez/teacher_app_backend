export interface PaginationOptions {
  page?: number;
  size?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface PaginatedOutput<T> {
  data: T[];
  meta: {
    page?: number;
    size?: number;
    startDate?: Date;
    endDate?: Date;
    total: number;
  };
}

// export interface PaginationOptions {
//   page: number;
//   size: number;
// }

// export interface IntervalOptions {
//   startDate?: Date;
//   endDate?: Date;
// }

// interface Countable<T, M> {
//   data: T[];
//   meta: M & {
//     total: number;
//   };
// }

// export interface PaginatedOutput<T> extends Countable<T, PaginationOptions> {}

// export interface IntervalOutput<T> extends Countable<T, IntervalOptions> {}

// export interface PaginatedIntervalOutput<T> extends Countable<T, PaginationOptions & IntervalOptions> {}
