class StatusCodedError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  getStatusCode(): number {
    return this.status;
  }
}

export { StatusCodedError };
