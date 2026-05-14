import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true })
  slug!: string;

  @Prop({ required: true, enum: ['online', 'offline'] })
  mode!: string;

  @Prop()
  note?: string;

  @Prop({ type: [String], default: [] })
  highlights!: string[];

  @Prop()
  entry?: string;

  @Prop()
  target?: string;

  @Prop()
  classSize?: string;

  @Prop()
  duration?: string;

  @Prop()
  audience?: string;

  @Prop({ default: true })
  is_active!: boolean;

  @Prop()
  image_url?: string;

  @Prop()
  full_content?: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
