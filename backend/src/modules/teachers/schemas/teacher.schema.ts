import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({ required: true })
  desc!: string;

  @Prop({ required: true })
  img!: string;

  @Prop()
  students?: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
