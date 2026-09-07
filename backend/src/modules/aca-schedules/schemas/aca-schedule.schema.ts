import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AcaScheduleDocument = HydratedDocument<AcaSchedule>;

@Schema({ timestamps: true })
export class AcaSchedule {
  @Prop({ required: true, trim: true })
  date!: string; // Format: 'YYYY-MM-DD'

  @Prop({ required: true, trim: true })
  startTime!: string; // Format: 'HH:MM' (e.g. '09:00')

  @Prop({ required: true, trim: true })
  endTime!: string; // Format: 'HH:MM' (e.g. '09:30')

  @Prop({
    required: true,
    enum: ['test_speaking_offline', 'test_speaking_online', 'test_support', 'task_aca', 'teach'],
    default: 'test_speaking_online',
  })
  type!: string;

  @Prop({ trim: true })
  acaName?: string; // Tên ACA phụ trách

  @Prop({ default: false })
  isBooked!: boolean;

  @Prop({
    type: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    default: null,
  })
  bookedBy?: {
    name: string;
    phone: string;
    email: string;
  };
}

export const AcaScheduleSchema = SchemaFactory.createForClass(AcaSchedule);
