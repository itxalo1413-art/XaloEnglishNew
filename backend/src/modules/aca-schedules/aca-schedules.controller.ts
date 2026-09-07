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
import { AcaSchedulesService } from './aca-schedules.service';
import { CreateAcaScheduleDto } from './dto/create-aca-schedule.dto';
import { UpdateAcaScheduleDto } from './dto/update-aca-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('aca-schedules')
export class AcaSchedulesController {
  constructor(private readonly acaSchedulesService: AcaSchedulesService) {}

  @Get()
  listAvailable() {
    return this.acaSchedulesService.listAvailable();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('all')
  listAll() {
    return this.acaSchedulesService.listAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() dto: CreateAcaScheduleDto) {
    return this.acaSchedulesService.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAcaScheduleDto) {
    return this.acaSchedulesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.acaSchedulesService.delete(id);
  }
}
