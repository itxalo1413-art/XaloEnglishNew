import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: (() => {
        // Note: config is loaded in ctor; actual values resolved at runtime.
        const storage = new CloudinaryStorage({
          cloudinary,
          params: {
            folder: 'xalo-english',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
          } as any,
        });
        return storage as any;
      })(),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/'))
          return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
        return cb(null, true);
      },
    }),
  )
  async uploadImage(@UploadedFile() file: any) {
    return {
      message: 'Image uploaded',
      image_url: file?.path,
    };
  }
}
