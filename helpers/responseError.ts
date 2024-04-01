export interface RequestErrorInfo {
  statusCode: number | undefined;
  message: string | undefined;
  code: string | undefined;
}

export class RequestError {
  statusCode: number | undefined;
  message: string | undefined;
  code: string | undefined;

  constructor(props: RequestErrorInfo) {
    this.statusCode = props.statusCode;
    this.code = props.code;
    this.message = props.message;
  }
}
