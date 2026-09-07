import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { UpsertBlogPostDto } from './dto/upsert-blog-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPosts: BlogPostsService) {}

  @Get()
  list(
    @Query('pageNumber') pageNumber?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.blogPosts.list(
      Number(pageNumber ?? 1),
      Number(pageSize ?? 10),
    );
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.blogPosts.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() dto: UpsertBlogPostDto) {
    return this.blogPosts.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpsertBlogPostDto) {
    return this.blogPosts.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogPosts.delete(id);
  }
}
