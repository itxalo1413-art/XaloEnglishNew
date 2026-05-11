import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateJobApplicationDto {
  @IsOptional()
  @IsIn(['new', 'reviewing', 'shortlisted', 'rejected', 'hired'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
