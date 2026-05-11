import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mentor } from './schemas/mentor.schema';
import { UpsertMentorDto } from './dto/upsert-mentor.dto';

@Injectable()
export class MentorsService {
  constructor(
    @InjectModel(Mentor.name) private readonly mentorModel: Model<Mentor>,
  ) {}

  list() {
    return this.mentorModel.find({}).sort({ createdAt: -1 });
  }

  async create(dto: UpsertMentorDto) {
    return this.mentorModel.create(dto);
  }

  async update(id: string, dto: UpsertMentorDto) {
    const updated = await this.mentorModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Mentor not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.mentorModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Mentor not found');
    return { message: 'Mentor removed' };
  }
}
