import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import fs from 'fs';
import type { Response } from 'express';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly applications: JobApplicationsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('resumePdf', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const dest = path.resolve(process.cwd(), 'uploads', 'applications');
          ensureDir(dest);
          cb(null, dest);
        },
        filename: (_req, file, cb) => {
          const safeBase = path
            .basename(file.originalname, path.extname(file.originalname))
            .replace(/[^a-zA-Z0-9-_]+/g, '-')
            .slice(0, 40);
          cb(null, `${Date.now()}-${safeBase}.pdf`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (file.mimetype !== 'application/pdf')
          return cb(new Error('Vui lòng chọn tệp PDF'), false);
        return cb(null, true);
      },
    }),
  )
  async create(
    @Body() dto: CreateJobApplicationDto,
    @UploadedFile() file?: any,
  ) {
    const resumePdf = file
      ? {
          filename: file.filename,
          path: `/uploads/applications/${file.filename}`,
          originalName: file.originalname,
        }
      : undefined;
    return this.applications.create(dto, resumePdf as any);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  list() {
    return this.applications.listAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateJobApplicationDto) {
    return this.applications.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.applications.delete(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('download/:id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const app = await this.applications.getById(id);
    const rel = app.resumePdf?.path;
    if (!rel) {
      res.status(404).json({ message: 'Resume not found' });
      return;
    }
    const abs = path.resolve(
      process.cwd(),
      rel.startsWith('/') ? `.${rel}` : rel,
    );
    if (!fs.existsSync(abs)) {
      res.status(404).json({ message: 'Resume file missing on server' });
      return;
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${(app.resumePdf?.originalName || 'resume.pdf').replace(/"/g, '')}"`,
    );
    fs.createReadStream(abs).pipe(res);
  }
}
