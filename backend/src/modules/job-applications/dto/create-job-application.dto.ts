import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateJobApplicationDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  jobPosition!: string;

  @IsString()
  @MinLength(10)
  coverLetter!: string;
}
