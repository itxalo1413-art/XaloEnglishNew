import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogPostDocument = HydratedDocument<BlogPost>;

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, unique: true, trim: true })
  slug!: string;

  @Prop()
  coverImageUrl?: string;

  @Prop()
  excerpt?: string;

  @Prop()
  metaTitle?: string;

  @Prop()
  metaDescription?: string;

  @Prop({ required: true })
  contentHtml!: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
