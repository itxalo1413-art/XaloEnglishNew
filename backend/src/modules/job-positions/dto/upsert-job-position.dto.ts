import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpsertJobPositionDto {
  @IsString() title!: string;
  @IsString() description!: string;
  @IsOptional() @IsArray() requirements?: string[];
  @IsOptional() @IsArray() benefits?: string[];
  @IsOptional() @IsString() salary?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsInt() displayOrder?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
