import { IsString } from 'class-validator';

export class UpsertTeacherDto {
  @IsString() name!: string;
  @IsString() bio!: string;
  @IsString() expertise!: string;
  @IsString() profile_image_url!: string;
}
