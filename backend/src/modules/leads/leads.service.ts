import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { AcaSchedulesService } from '../aca-schedules/aca-schedules.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
    private readonly acaSchedulesService: AcaSchedulesService,
  ) {}

  async create(dto: CreateLeadDto) {
    let finalTimeSlot = dto.timeSlot;

    if (dto.acaScheduleId) {
      const bookedSlot = await this.acaSchedulesService.bookSlot(dto.acaScheduleId, {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
      });

      const typeLabel = bookedSlot.type === 'test_speaking_offline' ? 'Offline' : 'Online';
      finalTimeSlot = `${bookedSlot.date} (${bookedSlot.startTime} - ${bookedSlot.endTime}) [${typeLabel}]${
        bookedSlot.acaName ? ` - ACA: ${bookedSlot.acaName}` : ''
      }`;
    }

    return this.leadModel.create({
      ...dto,
      timeSlot: finalTimeSlot,
      email: dto.email?.trim() || `no-email-${Date.now()}@xalo.local`,
    });
  }

  async listAll() {
    return this.leadModel.find({}).sort({ createdAt: -1 });
  }

  async updateStatus(id: string, status: string) {
    return this.leadModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async listSince(since: Date) {
    return this.leadModel
      .find({ createdAt: { $gte: since } })
      .sort({ createdAt: -1 });
  }
}
