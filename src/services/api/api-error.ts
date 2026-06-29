import type { ApiErrorDetail } from "@/types/api";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly details?: ApiErrorDetail[];

  constructor(message: string, statusCode: number, errorCode: string, details?: ApiErrorDetail[]) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }

  /** First field-level validation message, if any - useful for toast display. */
  get firstDetailMessage(): string | undefined {
    return this.details?.[0]?.message;
  }

  get isAuthError(): boolean {
    return this.statusCode === 401;
  }

  get isForbidden(): boolean {
    return this.statusCode === 403;
  }

  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  get isValidationError(): boolean {
    return this.statusCode === 422;
  }

  get isRateLimited(): boolean {
    return this.statusCode === 429;
  }
}
