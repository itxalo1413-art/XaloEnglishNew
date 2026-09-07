import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateAcaScheduleDto {
  @IsString()
  date!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;

  @IsString()
  @IsIn(['test_speaking_offline', 'test_speaking_online', 'test_support', 'task_aca', 'teach'])
  type!: string;

  @IsString()
  @IsOptional()
  acaName?: string;
}
