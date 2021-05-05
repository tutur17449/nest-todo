import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/roles/role.enum';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  pseudo: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role, default: Role.user })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
