import { IsString } from 'class-validator';

export class UpsertTeacherDto {
  @IsString() name!: string;
  @IsString() role!: string;
  @IsString() desc!: string;
  @IsString() img!: string;
  @IsString() @IsOptional() students?: string;
}
