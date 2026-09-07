import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

/** Lịch khai giảng theo tháng — ảnh poster + tiêu đề tuỳ chọn */
@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  month!: Date;

  @Prop()
  title?: string;

  @Prop({ type: [String], default: [] })
  scheduleImgURL!: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
