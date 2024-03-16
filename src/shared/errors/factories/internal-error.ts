import { AppError } from "../app-error";

export const internalErrorFactory = () =>
  AppError.formatError("internal-server-error", 500, "Internal server error");
