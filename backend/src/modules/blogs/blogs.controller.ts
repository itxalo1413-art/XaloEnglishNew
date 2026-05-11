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
import { BlogsService } from './blogs.service';
import { UpsertBlogDto } from './dto/upsert-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogs: BlogsService) {}

  @Get()
  list(@Query('pageNumber') pageNumber?: string) {
    return this.blogs.list(Number(pageNumber ?? 1), 10);
  }

  @Get('latest')
  latest() {
    return this.blogs.latest(3);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.blogs.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() dto: UpsertBlogDto) {
    return this.blogs.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpsertBlogDto) {
    return this.blogs.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogs.delete(id);
  }
}
