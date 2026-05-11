import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true })
  slug!: string;

  @Prop({ required: true })
  short_description!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ default: true })
  is_active!: boolean;

  @Prop()
  image_url?: string;

  @Prop({ required: true })
  full_content!: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
