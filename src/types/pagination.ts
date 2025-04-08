export type PaginationResponse<T> = {
    nextPage: number;
    previousPage: number;
    data: T[]
}