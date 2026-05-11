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
import { ProgramsService } from './programs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpsertProgramGroupDto } from './dto/program-group.dto';
import { UpsertProgramTrackDto } from './dto/program-track.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programs: ProgramsService) {}

  @Get('groups')
  listGroups() {
    return this.programs.listGroups();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('groups')
  createGroup(@Body() dto: UpsertProgramGroupDto) {
    return this.programs.createGroup(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put('groups/:id')
  updateGroup(@Param('id') id: string, @Body() dto: UpsertProgramGroupDto) {
    return this.programs.updateGroup(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('groups/:id')
  deleteGroup(@Param('id') id: string) {
    return this.programs.deleteGroup(id);
  }

  @Get('tracks')
  listTracks() {
    return this.programs.listTracks();
  }

  @Get('tracks/:slug')
  getTrack(@Param('slug') slug: string) {
    return this.programs.getTrackBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('tracks')
  createTrack(@Body() dto: UpsertProgramTrackDto) {
    return this.programs.createTrack(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put('tracks/:id')
  updateTrack(@Param('id') id: string, @Body() dto: UpsertProgramTrackDto) {
    return this.programs.updateTrack(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('tracks/:id')
  deleteTrack(@Param('id') id: string) {
    return this.programs.deleteTrack(id);
  }
}
