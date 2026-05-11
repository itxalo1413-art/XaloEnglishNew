import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true })
  bio!: string;

  @Prop({ required: true })
  expertise!: string;

  @Prop({ required: true })
  profile_image_url!: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
