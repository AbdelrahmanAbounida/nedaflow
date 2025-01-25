export interface APIResponseBody<T> {
  code: number;
  message: string;
  data: T;
  error: boolean;
}
