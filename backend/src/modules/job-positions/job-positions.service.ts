import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobPosition } from './schemas/job-position.schema';
import { UpsertJobPositionDto } from './dto/upsert-job-position.dto';

@Injectable()
export class JobPositionsService {
  constructor(
    @InjectModel(JobPosition.name)
    private readonly jobPositionModel: Model<JobPosition>,
  ) {}

  listPublic() {
    return this.jobPositionModel
      .find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 });
  }

  listAdmin() {
    return this.jobPositionModel
      .find({})
      .sort({ displayOrder: 1, createdAt: -1 });
  }

  create(dto: UpsertJobPositionDto) {
    return this.jobPositionModel.create({
      ...dto,
      requirements: dto.requirements ?? [],
      benefits: dto.benefits ?? [],
      displayOrder: Number.isFinite(Number(dto.displayOrder))
        ? Number(dto.displayOrder)
        : 0,
    });
  }

  async update(id: string, dto: UpsertJobPositionDto) {
    const updated = await this.jobPositionModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        requirements: dto.requirements ?? [],
        benefits: dto.benefits ?? [],
      },
      { new: true },
    );
    if (!updated) throw new NotFoundException('Job position not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.jobPositionModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Job position not found');
    return { message: 'Xóa vị trí công việc thành công' };
  }
}
