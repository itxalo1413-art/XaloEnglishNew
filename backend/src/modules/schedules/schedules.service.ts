import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from './schemas/schedule.schema';
import { UpsertScheduleDto } from './dto/upsert-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
  ) {}

  list() {
    return this.scheduleModel.find({}).sort({ month: -1, createdAt: -1 });
  }

  create(dto: UpsertScheduleDto) {
    return this.scheduleModel.create({
      month: new Date(dto.month),
      title: dto.title,
      scheduleImgURL: dto.scheduleImgURL ?? [],
    });
  }

  async update(id: string, dto: UpsertScheduleDto) {
    const existing = await this.scheduleModel.findById(id);
    if (!existing) throw new NotFoundException('Schedule not found');
    existing.month = new Date(dto.month);
    existing.title = dto.title;
    existing.scheduleImgURL = dto.scheduleImgURL ?? existing.scheduleImgURL;
    return existing.save();
  }

  async delete(id: string) {
    const deleted = await this.scheduleModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Schedule not found');
    return { message: 'Schedule removed' };
  }
}
