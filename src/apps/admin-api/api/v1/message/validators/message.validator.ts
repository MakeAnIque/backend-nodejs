import { NextFunction, Request, Response } from 'express';
import {
  ConstructResponse,
  ValidationException,
  ValidatorsInputObject,
} from '../../../../../../lib/utils';
import { MessageDto } from '../dto/message.dto';

export class MessageValidatorMiddleware extends ValidatorsInputObject<
  MessageDto,
  { [key: string]: any }
> {
  constructor(
    public readonly userInstance: MessageDto,
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

export function messageMiddlewareFun(
  req: Request,
  res: Response,
  next: NextFunction
) {
  new MessageValidatorMiddleware(MessageDto as any, req.body).validate(
    req,
    res,
    next
  );
}
