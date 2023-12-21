export interface CustomError extends Error {
  status?: 400 | 401 | 403 | 404 | 500;
}
