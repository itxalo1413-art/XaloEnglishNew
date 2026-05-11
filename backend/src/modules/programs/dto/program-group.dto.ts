import { IsInt, IsString } from 'class-validator';

export class UpsertProgramGroupDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsInt()
  order!: number;
}
