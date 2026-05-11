import { IsOptional, IsString } from 'class-validator';

export class UpsertBlogDto {
  @IsString() title!: string;
  @IsString() content!: string;
  @IsOptional() @IsString() image_url?: string;
  @IsOptional() @IsString() meta_title?: string;
  @IsOptional() @IsString() meta_description?: string;
}
