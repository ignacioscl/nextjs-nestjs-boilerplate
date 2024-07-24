interface CustomErrorParams {
    message?: string;
    status?: number;
    validationErrors?: Record<string, any>;
  }
  
  class CustomError extends Error {
    status: number;
    validationErrors: Record<string, any>;
  
    constructor({ message = 'An error occurred', status = 500, validationErrors = {} }: CustomErrorParams) {
      super(message);
      this.status = status;
      this.validationErrors = validationErrors;
      
      // Set the prototype explicitly to ensure instanceof works correctly
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }

  export default CustomError;