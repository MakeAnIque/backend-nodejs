import { Response } from 'express';

export class ConstructResponse {
  constructor(
    public readonly res: Response,
    public readonly responseInstance:
      | Success
      | ValidationException
      | NotFoundException
  ) {
    this.sendResponse();
  }

  public sendResponse(): void {
    this.res
      .status(this.responseInstance.statueCode)
      .send(this.responseInstance.body);
  }
}

export class Success {
  constructor(
    public body: { [key: string]: string },
    public statueCode: number = 200
  ) {}
}

export class ValidationException {
  constructor(
    public body: { [key: string]: string },
    public statueCode: number = 400
  ) {}
}

export class NotFoundException {
  constructor(
    public body: { [key: string]: string },
    public statueCode: number = 404
  ) {}
}
export class Exception {
  constructor(
    public body: { [key: string]: string },
    public statueCode: number = 500
  ) {}
}
