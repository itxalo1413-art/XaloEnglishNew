import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertCourseDto {
  @IsString() title!: string;
  @IsOptional() @IsString() slug?: string;
  @IsString() mode!: string;
  @IsOptional() @IsString() note?: string;
  @IsOptional() @IsString({ each: true }) highlights?: string[];
  @IsOptional() @IsString() entry?: string;
  @IsOptional() @IsString() target?: string;
  @IsOptional() @IsString() classSize?: string;
  @IsOptional() @IsString() duration?: string;
  @IsOptional() @IsString() audience?: string;
  @IsOptional() @IsBoolean() is_active?: boolean;
  @IsOptional() @IsString() image_url?: string;
  @IsOptional() @IsString() full_content?: string;
}
