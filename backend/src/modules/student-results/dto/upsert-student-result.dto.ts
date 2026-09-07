import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpsertStudentResultDto {
  @IsString() name!: string;
  @IsOptional() @IsNumber() inputScore?: number;
  @IsOptional() @IsNumber() inputListening?: number;
  @IsOptional() @IsNumber() inputReading?: number;
  @IsOptional() @IsNumber() inputWriting?: number;
  @IsOptional() @IsNumber() inputSpeaking?: number;
  @IsOptional() @IsNumber() overall?: number;
  @IsOptional() @IsNumber() listening?: number;
  @IsOptional() @IsNumber() reading?: number;
  @IsOptional() @IsNumber() writing?: number;
  @IsOptional() @IsNumber() speaking?: number;
  @IsOptional() @IsString() className?: string;
  @IsOptional() @IsString() studyTime?: string;
  @IsOptional() @IsString() testimonial?: string;
  @IsOptional() @IsString() certificateImageUrl?: string;
  @IsOptional() @IsString() profileImgURL?: string;
}
