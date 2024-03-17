type AppErrorsAttributes = {
  status: number;
  message: string;
  error: string;
};

export class AppError extends Error {
  status: number;
  error: string;

  constructor({ error, status, message }: AppErrorsAttributes) {
    super(message);
    this.status = status;
    this.error = error;
  }

  public static formatError(error: string, status: number, message: string) {
    return { status, error, message };
  }

  get appError() {
    return AppError.formatError(this.error, this.status, this.message);
  }
}
