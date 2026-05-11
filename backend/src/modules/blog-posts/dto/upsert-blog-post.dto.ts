import { IsOptional, IsString } from 'class-validator';

export class UpsertBlogPostDto {
  @IsString() title!: string;
  @IsOptional() @IsString() coverImageUrl?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsString() contentHtml!: string;
}
