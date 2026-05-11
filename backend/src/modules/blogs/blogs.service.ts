import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { Blog } from './schemas/blog.schema';
import { UpsertBlogDto } from './dto/upsert-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  private async generateUniqueSlug(title: string, excludeId?: string) {
    const base = slugify(title, { lower: true, strict: true, locale: 'vi' });
    let slug = base || 'blog';
    let i = 1;

    while (true) {
      const existing = await this.blogModel.findOne({
        slug,
        ...(excludeId ? { _id: { $ne: excludeId } } : {}),
      });
      if (!existing) return slug;
      i += 1;
      slug = `${base}-${i}`;
    }
  }

  async list(pageNumber = 1, pageSize = 10) {
    const page = Math.max(1, Number(pageNumber) || 1);
    const limit = Math.min(50, Math.max(1, Number(pageSize) || 10));
    const count = await this.blogModel.countDocuments({});
    const blogs = await this.blogModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1));
    return { blogs, page, pages: Math.ceil(count / limit) };
  }

  async latest(limit = 3) {
    return this.blogModel.find({}).sort({ createdAt: -1 }).limit(limit);
  }

  async getBySlug(slug: string) {
    const blog = await this.blogModel.findOne({ slug });
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async create(dto: UpsertBlogDto) {
    const slug = await this.generateUniqueSlug(dto.title);
    return this.blogModel.create({ ...dto, slug });
  }

  async update(id: string, dto: UpsertBlogDto) {
    const existing = await this.blogModel.findById(id);
    if (!existing) throw new NotFoundException('Blog not found');
    const nextSlug =
      dto.title && dto.title !== existing.title
        ? await this.generateUniqueSlug(dto.title, id)
        : existing.slug;
    Object.assign(existing, dto, { slug: nextSlug });
    return existing.save();
  }

  async delete(id: string) {
    const deleted = await this.blogModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Blog not found');
    return { message: 'Blog removed' };
  }
}
