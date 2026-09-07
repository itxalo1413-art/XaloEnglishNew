import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeadDocument = HydratedDocument<Lead>;

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop()
  message?: string;

  @Prop()
  purpose?: string;

  @Prop()
  timeSlot?: string;

  @Prop()
  acaScheduleId?: string;

  @Prop({
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new',
  })
  status!: string;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);
