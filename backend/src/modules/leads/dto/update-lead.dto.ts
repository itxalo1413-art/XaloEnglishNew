import { IsIn, IsOptional } from 'class-validator';

export class UpdateLeadDto {
  @IsOptional()
  @IsIn(['new', 'contacted', 'converted', 'closed'])
  status?: string;
}
