import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  month!: Date;

  @Prop({ type: [String], default: [] })
  scheduleImgURL!: string[];

  @Prop()
  title?: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
