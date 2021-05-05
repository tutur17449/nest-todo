import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export enum todoStatus {
  doing = 'doing',
  progress = 'progress',
  done = 'done',
}

@Schema({
  timestamps: true,
})
export class Todo extends mongoose.Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: todoStatus })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
