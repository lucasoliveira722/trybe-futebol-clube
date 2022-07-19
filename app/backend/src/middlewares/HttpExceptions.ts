class HttpException extends Error {
  constructor(public status: number, public message: string) {
    super();
  }
}

export default HttpException;
// instruções de middleware de erro retiradas de https://wanago.io/2018/12/17/typescript-express-error-handling-validation/
