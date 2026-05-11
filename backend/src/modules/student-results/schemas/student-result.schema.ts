import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentResultDocument = HydratedDocument<StudentResult>;

@Schema({ timestamps: true })
export class StudentResult {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop() inputScore?: number;
  @Prop() overall?: number;
  @Prop() listening?: number;
  @Prop() reading?: number;
  @Prop() writing?: number;
  @Prop() speaking?: number;

  @Prop() className?: string;
  @Prop() studyTime?: string;
  @Prop() testimonial?: string;
  @Prop() certificateImageUrl?: string;
  @Prop() profileImgURL?: string;
}

export const StudentResultSchema = SchemaFactory.createForClass(StudentResult);
