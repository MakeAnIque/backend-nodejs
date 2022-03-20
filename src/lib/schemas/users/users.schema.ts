import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';

export class Users {
  @prop()
  public username!: string;
}

export function UserModel(conn: mongoose.Connection) {
  return getModelForClass(Users, {
    existingConnection: conn,
  });
}
