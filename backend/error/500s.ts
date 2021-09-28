import { statusCodedError } from "./statusCodedError";

class DBAuthenticationError extends statusCodedError {
  constructor(message: string) {
    super(message, 500);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export { DBAuthenticationError };
