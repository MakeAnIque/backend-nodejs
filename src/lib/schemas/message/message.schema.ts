import { getModelForClass, mongoose, pre, prop } from '@typegoose/typegoose';

@pre<Message>('save', function () {
  this.isActive = true;
  this.createdAt = new Date().toISOString();
  this.updatedAt = new Date().toISOString();
})
export class Message {
  @prop({ type: String })
  public message!: string;

  @prop({ type: String })
  public type!: string;

  @prop({ type: String })
  typeName!: string;

  @prop({ type: Boolean })
  public isActive!: boolean;

  @prop({ type: Boolean })
  public isDeleted!: boolean;

  @prop({ type: Date })
  public createdAt!: string;

  @prop({ type: Date })
  public updatedAt!: string;
}

export function MessageModel(conn: mongoose.Connection) {
  return getModelForClass(Message, {
    existingConnection: conn,
  });
}
