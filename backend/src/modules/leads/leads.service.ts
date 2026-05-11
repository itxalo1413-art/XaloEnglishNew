import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
  ) {}

  async create(dto: CreateLeadDto) {
    const created = await this.leadModel.create({
      ...dto,
      goals: dto.goals ?? [],
      consultationTime: dto.consultationTime ?? [],
    });
    return created;
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
