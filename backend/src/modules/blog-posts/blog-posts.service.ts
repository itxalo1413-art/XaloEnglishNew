import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { BlogPost } from './schemas/blog-post.schema';
import { UpsertBlogPostDto } from './dto/upsert-blog-post.dto';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectModel(BlogPost.name) private readonly blogPostModel: Model<BlogPost>,
  ) {}

  private async generateUniqueSlug(title: string, excludeId?: string) {
    const base = slugify(title, { lower: true, strict: true, locale: 'vi' });
    let slug = base || 'post';
    let i = 1;

    while (true) {
      const existing = await this.blogPostModel.findOne({
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
    const count = await this.blogPostModel.countDocuments({});
    const posts = await this.blogPostModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * (page - 1));

    return { posts, page, pages: Math.ceil(count / limit) };
  }

  async getBySlug(slug: string) {
    const post = await this.blogPostModel.findOne({ slug });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(dto: UpsertBlogPostDto) {
    const slug = await this.generateUniqueSlug(dto.title);
    return this.blogPostModel.create({ ...dto, slug });
  }

  async update(id: string, dto: UpsertBlogPostDto) {
    const existing = await this.blogPostModel.findById(id);
    if (!existing) throw new NotFoundException('Post not found');

    const nextSlug =
      dto.title && dto.title !== existing.title
        ? await this.generateUniqueSlug(dto.title, id)
        : existing.slug;
    Object.assign(existing, dto, { slug: nextSlug });
    return existing.save();
  }

  async delete(id: string) {
    const deleted = await this.blogPostModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Post not found');
    return { message: 'Post removed' };
  }
}
