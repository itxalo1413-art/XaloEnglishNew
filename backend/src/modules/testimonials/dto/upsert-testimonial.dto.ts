import { IsOptional, IsString } from 'class-validator';

export class UpsertTestimonialDto {
  @IsString() student_name!: string;
  @IsString() score_achieved!: string;
  @IsString() testimonial_text!: string;
  @IsOptional() @IsString() certificate_image_url?: string;
}
