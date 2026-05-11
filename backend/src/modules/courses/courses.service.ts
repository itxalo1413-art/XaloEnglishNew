import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { Course } from './schemas/course.schema';
import { UpsertCourseDto } from './dto/upsert-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  private async generateUniqueSlug(name: string, excludeId?: string) {
    const base = slugify(name, { lower: true, strict: true, locale: 'vi' });
    let slug = base || 'course';
    let i = 1;

    while (true) {
      const existing = await this.courseModel.findOne({
        slug,
        ...(excludeId ? { _id: { $ne: excludeId } } : {}),
      });
      if (!existing) return slug;
      i += 1;
      slug = `${base}-${i}`;
    }
  }

  listPublic() {
    return this.courseModel.find({ is_active: true }).sort({ createdAt: -1 });
  }

  listAll() {
    return this.courseModel.find({}).sort({ createdAt: -1 });
  }

  async getBySlug(slug: string) {
    const course = await this.courseModel.findOne({ slug });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async create(dto: UpsertCourseDto) {
    const slug = await this.generateUniqueSlug(dto.name);
    return this.courseModel.create({
      ...dto,
      slug,
      is_active: dto.is_active ?? true,
    });
  }

  async update(id: string, dto: UpsertCourseDto) {
    const existing = await this.courseModel.findById(id);
    if (!existing) throw new NotFoundException('Course not found');
    const nextSlug =
      dto.name && dto.name !== existing.name
        ? await this.generateUniqueSlug(dto.name, id)
        : existing.slug;
    Object.assign(existing, dto, { slug: nextSlug });
    if (dto.is_active !== undefined)
      (existing as any).is_active = dto.is_active;
    return existing.save();
  }

  async delete(id: string) {
    const deleted = await this.courseModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Course not found');
    return { message: 'Course removed' };
  }
}
