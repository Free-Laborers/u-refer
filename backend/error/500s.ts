import { StatusCodedError } from "./statusCodedError";

class DBAuthenticationError extends StatusCodedError {
  constructor(message: string) {
    super(message, 500);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export { DBAuthenticationError };
