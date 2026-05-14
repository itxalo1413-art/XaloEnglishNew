import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertScheduleDto {
  @IsString()
  className!: string;

  @IsOptional()
  @IsString()
  filterKey?: string;

  @IsOptional()
  @IsString()
  filterLabel?: string;

  @IsString()
  delivery!: string;

  @IsString()
  programGroup!: string;

  @IsOptional()
  @IsString()
  entry?: string;

  @IsOptional()
  @IsString()
  target?: string;

  @IsOptional()
  @IsString()
  oneToOneSlot?: string;

  @IsString()
  audience!: string;

  @IsString()
  timeSlot!: string;

  @IsString()
  startDate!: string;

  @IsString()
  studyDays!: string;

  @IsString()
  studyTime!: string;

  @IsOptional()
  @IsNumber()
  seatsLeft?: number;

  @IsOptional()
  @IsString()
  shortDesc?: string;

  @IsOptional()
  @IsString()
  fitFor?: string;

  @IsOptional()
  @IsArray()
  scheduleImgURL?: string[];
}
