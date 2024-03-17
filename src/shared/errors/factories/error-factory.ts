import { AppError } from "../app-error";

export class ErrorFactory {
  public static badRequest(message: string, error: string = "bad-request") {
    return new AppError(AppError.formatError(error, 400, message));
  }

  public static unauthorized(message: string, error: string = "unauthorized") {
    return new AppError(AppError.formatError(error, 401, message));
  }

  public static forbidden(message: string, error: string = "forbidden") {
    return new AppError(AppError.formatError(error, 403, message));
  }

  public static notFound(message: string, error: string = "not-found") {
    return new AppError(AppError.formatError(error, 404, message));
  }

  public static internalServerError(message: string, error: string = "internal-server-error") {
    return new AppError(AppError.formatError(error, 500, message));
  }

  public static conflict(message: string, error: string = "conflict") {
    return new AppError(AppError.formatError(error, 409, message));
  }
}
