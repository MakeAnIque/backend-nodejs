import { NextFunction, Request, Response } from 'express';
import { ConstructResponse, Exception } from '../../../../../../lib/utils';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(
    public readonly req: Request,
    public readonly res: Response,
    public readonly next: NextFunction
  ) {}

  async createUser() {
    // console.log((this.req as any).instanceBody);

    try {
      const result = await new UserService().createUser(
        (this.req as any).instanceBody
      );

      new ConstructResponse(this.res, result);
    } catch (error) {
      new ConstructResponse(
        this.res,
        new Exception({ error: 'Internal Error' })
      );
    }
  }

  async getUser() {
    try {
      const result = await new UserService().getUser();

      new ConstructResponse(this.res, result);
    } catch (error) {
      new ConstructResponse(
        this.res,
        new Exception({ error: 'Internal Error' })
      );
    }
  }
}
