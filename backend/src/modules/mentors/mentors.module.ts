import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MentorsController } from './mentors.controller';
import { MentorsService } from './mentors.service';
import { Mentor, MentorSchema } from './schemas/mentor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mentor.name, schema: MentorSchema }]),
  ],
  controllers: [MentorsController],
  providers: [MentorsService],
})
export class MentorsModule {}
