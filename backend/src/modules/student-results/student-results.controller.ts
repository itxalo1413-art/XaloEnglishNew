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
import { StudentResultsService } from './student-results.service';
import { UpsertStudentResultDto } from './dto/upsert-student-result.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('student-results')
export class StudentResultsController {
  constructor(private readonly results: StudentResultsService) {}

  @Get()
  list() {
    return this.results.list();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() dto: UpsertStudentResultDto) {
    return this.results.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpsertStudentResultDto) {
    return this.results.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.results.delete(id);
  }
}
