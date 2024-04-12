export class ErrorHandler extends Error {
    constructor(message: string, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }