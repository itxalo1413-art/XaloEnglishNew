import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional() @IsString() phone_number?: string;
  @IsOptional() @IsString() email_address?: string;
  @IsOptional() @IsString() facebook_link?: string;
  @IsOptional() @IsString() meta_title_home?: string;
  @IsOptional() @IsString() meta_description_home?: string;
  @IsOptional() @IsString() header_script?: string;
  @IsOptional() @IsString() body_script?: string;
}
