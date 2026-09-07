import { IsOptional, IsString } from 'class-validator';

export class UpsertBlogPostDto {
  @IsString() title!: string;
  @IsOptional() @IsString() coverImageUrl?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() metaTitle?: string;
  @IsOptional() @IsString() metaDescription?: string;
  @IsString() contentHtml!: string;
}
