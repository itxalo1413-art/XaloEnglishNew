import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { UpsertCourseDto } from './dto/upsert-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}

  @Get()
  listPublic() {
    return this.courses.listPublic();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('all')
  listAll() {
    return this.courses.listAll();
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.courses.getBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('seed-defaults')
  seedDefaults() {
    return this.courses.seedDefaults();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() dto: UpsertCourseDto) {
    return this.courses.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpsertCourseDto) {
    return this.courses.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.courses.delete(id);
  }
}
