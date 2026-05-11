import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SettingDocument = HydratedDocument<Setting>;

@Schema({ timestamps: true })
export class Setting {
  @Prop() phone_number?: string;
  @Prop() email_address?: string;
  @Prop() facebook_link?: string;
  @Prop() meta_title_home?: string;
  @Prop() meta_description_home?: string;
  @Prop() header_script?: string;
  @Prop() body_script?: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
