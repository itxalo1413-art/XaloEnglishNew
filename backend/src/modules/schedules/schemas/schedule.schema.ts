import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  className!: string;

  @Prop()
  filterKey?: string;

  @Prop()
  filterLabel?: string;

  @Prop({ enum: ['ONLINE', 'OFFLINE'] })
  delivery!: string;

  @Prop({ enum: ['ieltsOnline', 'ieltsOffline', 'special'] })
  programGroup!: string;

  @Prop()
  entry?: string;

  @Prop()
  target?: string;

  @Prop()
  oneToOneSlot?: string;

  @Prop({ enum: ['HS', 'SV'] })
  audience!: string;

  @Prop({ enum: ['Sáng', 'Chiều', 'Tối'] })
  timeSlot!: string;

  @Prop()
  startDate!: string;

  @Prop()
  studyDays!: string;

  @Prop()
  studyTime!: string;

  @Prop({ default: 0 })
  seatsLeft!: number;

  @Prop()
  shortDesc?: string;

  @Prop()
  fitFor?: string;

  @Prop({ type: [String], default: [] })
  scheduleImgURL!: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
