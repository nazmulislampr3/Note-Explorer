class ApiError extends Error {
  statusCode: number;
  message: string;
  data?: any;

  constructor(
    statusCode: number = 400,
    message: string | null = null,
    data: any = null
  ) {
    message = message === null ? "Something went wrong!" : message;
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (data) {
      this.data = data;
    }
  }
}

export default ApiError;
