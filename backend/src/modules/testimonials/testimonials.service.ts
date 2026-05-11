import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from './schemas/testimonial.schema';
import { UpsertTestimonialDto } from './dto/upsert-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private readonly testimonialModel: Model<Testimonial>,
  ) {}

  list() {
    return this.testimonialModel.find({}).sort({ createdAt: -1 });
  }

  create(dto: UpsertTestimonialDto) {
    return this.testimonialModel.create(dto);
  }

  async update(id: string, dto: UpsertTestimonialDto) {
    const updated = await this.testimonialModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Testimonial not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.testimonialModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Testimonial not found');
    return { message: 'Testimonial removed' };
  }
}
