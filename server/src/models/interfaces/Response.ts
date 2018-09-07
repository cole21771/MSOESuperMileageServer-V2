export interface Response<T> {
    error: boolean;
    errorMessage?: string;
    data?: T;
}
