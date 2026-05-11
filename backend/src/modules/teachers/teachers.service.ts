import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './schemas/teacher.schema';
import { UpsertTeacherDto } from './dto/upsert-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
  ) {}

  list() {
    return this.teacherModel.find({}).sort({ createdAt: -1 });
  }

  create(dto: UpsertTeacherDto) {
    return this.teacherModel.create(dto);
  }

  async update(id: string, dto: UpsertTeacherDto) {
    const updated = await this.teacherModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.teacherModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Teacher not found');
    return { message: 'Teacher removed' };
  }
}
