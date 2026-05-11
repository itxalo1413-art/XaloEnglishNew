import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertMentorDto {
  @IsString() name!: string;
  @IsNumber() overall!: number;
  @IsString() slogan_Title!: string;
  @IsString() slogan_Content!: string;
  @IsString() imageUrl!: string;
  @IsOptional() @IsString() ieltsImage?: string;
}
