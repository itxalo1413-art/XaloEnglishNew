import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobApplication } from './schemas/job-application.schema';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectModel(JobApplication.name)
    private readonly applicationModel: Model<JobApplication>,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  async create(
    dto: CreateJobApplicationDto,
    resumePdf?: { filename: string; path: string; originalName: string },
  ) {
    const created = await this.applicationModel.create({ ...dto, resumePdf });

    const hrEmail = this.config.get<string>('HR_EMAIL') || 'hr@xalo.edu.vn';
    const adminUrl =
      this.config.get<string>('ADMIN_URL') || 'https://www.xalo.edu.vn/admin';

    try {
      await this.mail.send({
        to: hrEmail,
        subject: `[ỨNG TUYỂN MỚI] - ${dto.jobPosition} - ${dto.fullName}`,
        text:
          `Có một ứng viên mới vừa nộp hồ sơ:\n` +
          `- Họ tên: ${dto.fullName}\n` +
          `- Vị trí: ${dto.jobPosition}\n` +
          `- Email: ${dto.email}\n` +
          `- Số điện thoại: ${dto.phone}\n` +
          `- Thư giới thiệu: ${dto.coverLetter}\n\n` +
          `Vui lòng kiểm tra trang quản trị để xem chi tiết và tải CV.`,
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #1a73e8;">Thông báo Tuyển dụng mới</h2>
  <p>Hệ thống vừa nhận được một hồ sơ ứng tuyển mới:</p>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Họ tên:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${dto.fullName}</td></tr>
    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Vị trí:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${dto.jobPosition}</td></tr>
    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${dto.email}">${dto.email}</a></td></tr>
    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Số điện thoại:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${dto.phone}</td></tr>
  </table>
  <p style="margin-top: 20px;"><b>Thư giới thiệu:</b></p>
  <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #1a73e8;">
    ${(dto.coverLetter || '').replace(/\n/g, '<br/>')}
  </div>
  <p style="margin-top: 30px;">
    <a href="${adminUrl}/applications" style="background: #1a73e8; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Xem chi tiết trên Trang Quản Trị</a>
  </p>
</div>`,
      });
    } catch {
      // Non-blocking
    }

    return created;
  }

  listAll() {
    return this.applicationModel.find({}).sort({ createdAt: -1 });
  }

  async getById(id: string) {
    const doc = await this.applicationModel.findById(id);
    if (!doc) throw new NotFoundException('Job application not found');
    return doc;
  }

  async update(id: string, update: any) {
    const updated = await this.applicationModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundException('Job application not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.applicationModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Job application not found');
    return { message: 'Job application deleted successfully' };
  }
}
