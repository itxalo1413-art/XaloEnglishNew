import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpsertScheduleDto {
  @IsDateString()
  month!: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scheduleImgURL?: string[];
}
