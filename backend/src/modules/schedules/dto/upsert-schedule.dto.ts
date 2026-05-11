import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpsertScheduleDto {
  @IsDateString()
  month!: string;

  @IsArray()
  scheduleImgURL!: string[];

  @IsOptional()
  @IsString()
  title?: string;
}
