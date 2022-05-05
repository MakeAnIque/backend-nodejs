import { getModelForClass, mongoose, pre, prop } from '@typegoose/typegoose';

@pre<Users>('save', function () {
  this.isActive = true;
  this.createdAt = new Date().toISOString();
  this.updatedAt = new Date().toISOString();
})
export class Users {
  @prop({ type: String })
  public firstName!: string;

  @prop({ type: String })
  public lastName!: string;

  @prop({ type: String })
  countryCode!: string;

  @prop({ type: String })
  public mobileNumber!: number;

  @prop({ type: Boolean })
  public isActive!: boolean;

  @prop({ type: Boolean })
  public isDeleted!: boolean;

  @prop({ type: Date })
  public createdAt!: string;

  @prop({ type: Date })
  public updatedAt!: string;
}

export function UserModel(conn: mongoose.Connection) {
  return getModelForClass(Users, {
    existingConnection: conn,
  });
}
