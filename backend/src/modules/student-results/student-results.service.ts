import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentResult } from './schemas/student-result.schema';
import { UpsertStudentResultDto } from './dto/upsert-student-result.dto';

@Injectable()
export class StudentResultsService {
  constructor(
    @InjectModel(StudentResult.name)
    private readonly resultModel: Model<StudentResult>,
  ) {}

  list() {
    return this.resultModel.find({}).sort({ createdAt: -1 });
  }

  create(dto: UpsertStudentResultDto) {
    return this.resultModel.create(dto);
  }

  async update(id: string, dto: UpsertStudentResultDto) {
    const updated = await this.resultModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Student result not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.resultModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Student result not found');
    return { message: 'Student result removed' };
  }
}
