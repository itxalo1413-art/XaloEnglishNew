import { IsString, IsOptional, IsIn, IsBoolean } from 'class-validator';

export class UpdateAcaScheduleDto {
  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  @IsIn(['test_speaking_offline', 'test_speaking_online', 'test_support', 'task_aca', 'teach'])
  type?: string;

  @IsString()
  @IsOptional()
  acaName?: string;

  @IsBoolean()
  @IsOptional()
  isBooked?: boolean;
}
