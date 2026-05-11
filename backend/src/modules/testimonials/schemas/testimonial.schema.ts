import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ required: true, trim: true })
  student_name!: string;

  @Prop({ required: true, trim: true })
  score_achieved!: string;

  @Prop({ required: true })
  testimonial_text!: string;

  @Prop()
  certificate_image_url?: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
