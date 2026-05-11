import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProgramGroup } from './program-group.schema';

export type ProgramTrackDocument = HydratedDocument<ProgramTrack>;

@Schema({ timestamps: true })
export class ProgramTrack {
  @Prop({ type: Types.ObjectId, ref: ProgramGroup.name, required: true })
  group!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  slug!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  order!: number;

  @Prop()
  entryBandText?: string;

  @Prop()
  exitBandText?: string;

  @Prop()
  durationText?: string;

  @Prop({ type: Array, default: [] })
  targetAudience!: Array<{ title?: string; bullets?: string[] }>;

  @Prop({ type: Array, default: [] })
  syllabusItems!: Array<{
    code?: string;
    title?: string;
    description?: string;
    bullets?: string[];
  }>;

  @Prop()
  detailIllustrationUrl?: string;

  @Prop({ type: [String], default: [] })
  formats!: string[];

  @Prop()
  courseLink?: string;
}

export const ProgramTrackSchema = SchemaFactory.createForClass(ProgramTrack);
