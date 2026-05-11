import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MentorDocument = HydratedDocument<Mentor>;

@Schema({ timestamps: true })
export class Mentor {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true })
  overall!: number;

  @Prop({ required: true })
  slogan_Title!: string;

  @Prop({ required: true })
  slogan_Content!: string;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop()
  ieltsImage?: string;
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);
