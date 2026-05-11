import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertCourseDto {
  @IsString() name!: string;
  @IsString() short_description!: string;
  @IsNumber() price!: number;
  @IsOptional() @IsBoolean() is_active?: boolean;
  @IsOptional() @IsString() image_url?: string;
  @IsString() full_content!: string;
}
