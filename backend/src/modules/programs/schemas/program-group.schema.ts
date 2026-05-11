import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProgramGroupDocument = HydratedDocument<ProgramGroup>;

@Schema({ timestamps: true })
export class ProgramGroup {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, trim: true })
  slug!: string;

  @Prop({ required: true })
  order!: number;
}

export const ProgramGroupSchema = SchemaFactory.createForClass(ProgramGroup);
