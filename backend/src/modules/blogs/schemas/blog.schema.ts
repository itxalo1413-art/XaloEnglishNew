import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, unique: true, trim: true })
  slug!: string;

  @Prop({ required: true })
  content!: string;

  @Prop()
  image_url?: string;

  @Prop()
  meta_title?: string;

  @Prop()
  meta_description?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
