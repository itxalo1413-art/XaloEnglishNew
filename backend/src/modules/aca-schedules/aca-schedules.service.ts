import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcaSchedule, AcaScheduleDocument } from './schemas/aca-schedule.schema';
import { CreateAcaScheduleDto } from './dto/create-aca-schedule.dto';
import { UpdateAcaScheduleDto } from './dto/update-aca-schedule.dto';

@Injectable()
export class AcaSchedulesService {
  constructor(
    @InjectModel(AcaSchedule.name)
    private readonly acaScheduleModel: Model<AcaScheduleDocument>,
  ) {}

  async listAll(): Promise<AcaSchedule[]> {
    return this.acaScheduleModel.find().sort({ date: 1, startTime: 1 }).exec();
  }

  async listAvailable(): Promise<AcaSchedule[]> {
    // Lấy ngày hiện tại ở VN (GMT+7) định dạng YYYY-MM-DD
    const today = new Date();
    // Bù thêm múi giờ VN (+7)
    const vnTime = new Date(today.getTime() + 7 * 60 * 60 * 1000);
    const dateStr = vnTime.toISOString().split('T')[0];

    return this.acaScheduleModel
      .find({
        isBooked: false,
        date: { $gte: dateStr },
        type: { $in: ['test_speaking_offline', 'test_speaking_online'] },
      })
      .sort({ date: 1, startTime: 1 })
      .exec();
  }

  async create(dto: CreateAcaScheduleDto): Promise<AcaSchedule> {
    return this.acaScheduleModel.create(dto);
  }

  async update(id: string, dto: UpdateAcaScheduleDto): Promise<AcaSchedule> {
    const updateData: any = { ...dto };
    if (dto.isBooked === false) {
      updateData.bookedBy = null;
    }
    const updated = await this.acaScheduleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Không tìm thấy lịch làm việc.');
    }
    return updated;
  }

  async delete(id: string): Promise<AcaSchedule> {
    const deleted = await this.acaScheduleModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Không tìm thấy lịch làm việc.');
    }
    return deleted;
  }

  async bookSlot(
    id: string,
    studentInfo: { name: string; phone: string; email?: string },
  ): Promise<AcaScheduleDocument> {
    const slot = await this.acaScheduleModel.findById(id).exec();
    if (!slot) {
      throw new NotFoundException('Không tìm thấy ca trực của ACA.');
    }
    if (slot.isBooked) {
      throw new BadRequestException('Ca trực này đã được đăng ký bởi học viên khác.');
    }

    slot.isBooked = true;
    slot.bookedBy = {
      name: studentInfo.name,
      phone: studentInfo.phone,
      email: studentInfo.email || '',
    };
    return slot.save();
  }
}
