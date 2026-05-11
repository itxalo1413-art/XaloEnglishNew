import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpsertProgramTrackDto {
  @IsString()
  group!: string;

  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  order!: number;

  @IsOptional()
  @IsString()
  entryBandText?: string;

  @IsOptional()
  @IsString()
  exitBandText?: string;

  @IsOptional()
  @IsString()
  durationText?: string;

  @IsOptional()
  @IsString()
  detailIllustrationUrl?: string;

  @IsOptional()
  @IsArray()
  targetAudience?: any[];

  @IsOptional()
  @IsArray()
  syllabusItems?: any[];

  @IsOptional()
  @IsArray()
  formats?: string[];

  @IsOptional()
  @IsString()
  courseLink?: string;
}
