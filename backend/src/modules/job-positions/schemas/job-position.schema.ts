import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobPositionDocument = HydratedDocument<JobPosition>;

@Schema({ timestamps: true })
export class JobPosition {
  @Prop({ required: true, unique: true, trim: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ type: [String], default: [] })
  requirements!: string[];

  @Prop({ type: [String], default: [] })
  benefits!: string[];

  @Prop()
  salary?: string;

  @Prop({ default: 'Hà Nội' })
  location!: string;

  @Prop({ enum: ['Full-time', 'Part-time', 'Contract'], default: 'Full-time' })
  type!: string;

  @Prop({ default: 0 })
  displayOrder!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const JobPositionSchema = SchemaFactory.createForClass(JobPosition);
