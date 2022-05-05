import { NextFunction, Request, Response } from 'express';
import {
  ConstructResponse,
  ValidationException,
  ValidatorsInputObject,
} from '../../../../../../lib/utils';
import { UserDto } from '../dto/user.dto';

export class UserValidatorMiddleware extends ValidatorsInputObject<
  UserDto,
  { [key: string]: any }
> {
  constructor(
    public readonly userInstance: UserDto,
    public readonly rawObject: { [key: string]: any }
  ) {
    super(userInstance, rawObject);
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    const instanceBody = this.getClassFromPlainObject();
    const validationResult = await this.validateObject(instanceBody);

    if (validationResult.length) {
      return new ConstructResponse(
        res,
        new ValidationException(validationResult)
      );
    }

    (req as any).instanceBody = instanceBody;
    next();
  }
}

export function userMiddlewareFun(
  req: Request,
  res: Response,
  next: NextFunction
) {
  new UserValidatorMiddleware(UserDto as any, req.body).validate(
    req,
    res,
    next
  );
}
