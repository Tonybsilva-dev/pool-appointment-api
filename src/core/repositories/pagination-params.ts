export interface PaginationParams {
  page?: number;
  perPage?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export function toPrismaPagination({ page = 1, perPage = 10, orderBy, orderDirection }: PaginationParams) {
  return {
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: {
      [orderBy ?? 'createdAt']: orderDirection ?? 'desc',
    },
  };
}