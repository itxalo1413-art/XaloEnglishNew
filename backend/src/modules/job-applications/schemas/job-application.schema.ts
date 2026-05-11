import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobApplicationDocument = HydratedDocument<JobApplication>;

@Schema({ timestamps: true })
export class JobApplication {
  @Prop({ required: true, trim: true })
  fullName!: string;

  @Prop({ required: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop({ required: true, trim: true })
  jobPosition!: string;

  @Prop({ required: true })
  coverLetter!: string;

  @Prop({
    type: {
      filename: String,
      path: String,
      originalName: String,
    },
  })
  resumePdf?: { filename?: string; path?: string; originalName?: string };

  @Prop({
    type: String,
    enum: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'],
    default: 'new',
  })
  status!: string;

  @Prop()
  notes?: string;
}

export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
