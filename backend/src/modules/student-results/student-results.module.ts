import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentResultsController } from './student-results.controller';
import { StudentResultsService } from './student-results.service';
import {
  StudentResult,
  StudentResultSchema,
} from './schemas/student-result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentResult.name, schema: StudentResultSchema },
    ]),
  ],
  controllers: [StudentResultsController],
  providers: [StudentResultsService],
})
export class StudentResultsModule {}
