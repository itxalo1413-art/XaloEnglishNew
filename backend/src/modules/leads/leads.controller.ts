import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  async create(@Body() dto: CreateLeadDto) {
    return this.leads.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  async list() {
    return this.leads.listAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leads.updateStatus(id, dto.status ?? 'new');
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('export')
  async exportCsv(@Res() res: Response) {
    const leads = await this.leads.listAll();
    const fields = ['Name', 'Email', 'Phone', 'Message', 'Status', 'Date'];
    const csv = leads.map((lead: any) =>
      [
        lead.name,
        lead.email,
        lead.phone,
        lead.message ?? '',
        lead.status,
        lead.createdAt,
      ].join(','),
    );
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(`${fields.join(',')}\n${csv.join('\n')}`);
  }
}
