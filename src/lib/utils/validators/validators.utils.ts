import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export abstract class ValidatorsInputObject<T, V> {
  constructor(public classInstanceType: T, public rawObject: V) {}

  public getClassFromPlainObject(): any {
    return plainToInstance(
      this.classInstanceType as any,
      this.rawObject
    ) as any;
  }

  public async validateObject(instanceObject: any): Promise<any> {
    return validate(instanceObject);
  }
}
