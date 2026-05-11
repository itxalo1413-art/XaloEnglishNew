import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobPositionsController } from './job-positions.controller';
import { JobPositionsService } from './job-positions.service';
import { JobPosition, JobPositionSchema } from './schemas/job-position.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobPosition.name, schema: JobPositionSchema },
    ]),
  ],
  controllers: [JobPositionsController],
  providers: [JobPositionsService],
})
export class JobPositionsModule {}
