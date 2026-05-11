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
import { JobPositionsService } from './job-positions.service';
import { UpsertJobPositionDto } from './dto/upsert-job-position.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('job-positions')
export class JobPositionsController {
  constructor(private readonly jobPositions: JobPositionsService) {}

  @Get()
  listPublic() {
    return this.jobPositions.listPublic();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin/all')
  listAdmin() {
    return this.jobPositions.listAdmin();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() dto: UpsertJobPositionDto) {
    return this.jobPositions.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpsertJobPositionDto) {
    return this.jobPositions.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobPositions.delete(id);
  }
}
