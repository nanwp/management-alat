export interface Meta {
    page: number
    limit: number
    total: number
    totalPages?: number
}

export interface Pagination<T> {
    data: T[]
    meta: Meta
}

export const createPagination = <T>(data: T[], meta: Meta): Pagination<T> => ({
    data,
    meta
});

export const createMeta = (page: number, limit: number, total: number): Meta => ({
    page,
    limit,
    total
});

export interface PaginationRequest {
    page: number
    limit: number
    keyword?: string
}

export const parsePaginationRequest = (query: any): PaginationRequest => {
    return {
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        keyword: query.keyword || ""
    };
};
