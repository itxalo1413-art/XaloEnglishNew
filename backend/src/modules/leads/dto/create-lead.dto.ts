import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  purpose?: string;

  @IsOptional()
  @IsString()
  timeSlot?: string;

  @IsOptional()
  @IsString()
  acaScheduleId?: string;
}
