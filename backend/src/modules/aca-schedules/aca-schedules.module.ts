import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcaSchedulesController } from './aca-schedules.controller';
import { AcaSchedulesService } from './aca-schedules.service';
import { AcaSchedule, AcaScheduleSchema } from './schemas/aca-schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AcaSchedule.name, schema: AcaScheduleSchema }]),
  ],
  controllers: [AcaSchedulesController],
  providers: [AcaSchedulesService],
  exports: [AcaSchedulesService],
})
export class AcaSchedulesModule {}
