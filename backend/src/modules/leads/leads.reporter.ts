import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { LeadsService } from './leads.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class LeadsReporter {
  private readonly logger = new Logger(LeadsReporter.name);

  constructor(
    private readonly leads: LeadsService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  private async sendLeadSummaryReport(reportLabel: string, hoursBack: number) {
    const adminEmail = this.config.get<string>('ADMIN_EMAIL');
    if (!adminEmail) return;

    const sinceDate = new Date();
    sinceDate.setHours(sinceDate.getHours() - hoursBack);
    sinceDate.setMinutes(sinceDate.getMinutes() - 2);

    const newLeads = await this.leads.listSince(sinceDate);
    if (newLeads.length === 0) {
      this.logger.log(`[${reportLabel}] Không có lead mới.`);
      return;
    }

    const leadDetails = newLeads
      .map((lead: any, index: number) => {
        const purpose = lead.purpose || 'Không có';
        const timeSlot = lead.timeSlot || 'Không có';
        return (
          `${index + 1}. ${lead.name} - ${lead.phone} (${lead.email})\n` +
          `   - Lúc: ${new Date(lead.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}\n` +
          `   - Mục đích: ${purpose}\n` +
          `   - Khung giờ: ${timeSlot}\n` +
          `   - Lời nhắn: ${lead.message || 'Không có'}`
        );
      })
      .join('\n\n');

    const htmlDetails = newLeads
      .map((lead: any, index: number) => {
        const purpose = lead.purpose || 'Không có';
        const timeSlot = lead.timeSlot || 'Không có';
        return `<li>
  <b>${index + 1}. ${lead.name}</b> - ${lead.phone} (${lead.email})<br/>
  <i>Lúc: ${new Date(lead.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</i><br/>
  <span><b>Mục đích:</b> ${purpose}</span><br/>
  <span><b>Khung giờ:</b> ${timeSlot}</span><br/>
  <span><b>Lời nhắn:</b> ${lead.message || '<i>Không có</i>'}</span>
</li>`;
      })
      .join(
        '<hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;"/>',
      );

    await this.mail.send({
      to: adminEmail,
      subject: `[BÁO CÁO] ${newLeads.length} Lead mới lúc ${reportLabel}`,
      text: `Báo cáo định kỳ lúc ${reportLabel}\n\nTổng số lead mới: ${newLeads.length}\n\n${leadDetails}`,
      html: `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <h3 style="color: #1a73e8; border-bottom: 2px solid #1a73e8; padding-bottom: 10px;">Báo cáo Lead định kỳ (${reportLabel})</h3>
  <p style="font-size: 16px;">Trong ${hoursBack} giờ qua, hệ thống đã nhận được <b style="color: #d93025; font-size: 18px;">${newLeads.length}</b> lead mới.</p>
  <ul style="list-style: none; padding: 0;">${htmlDetails}</ul>
</div>`,
    });

    this.logger.log(`[${reportLabel}] Đã gửi báo cáo ${newLeads.length} lead.`);
  }

  @Cron('0 9 * * *', { timeZone: 'Asia/Ho_Chi_Minh' })
  async report9am() {
    await this.sendLeadSummaryReport('9h sáng', 13);
  }

  @Cron('0 15 * * *', { timeZone: 'Asia/Ho_Chi_Minh' })
  async report3pm() {
    await this.sendLeadSummaryReport('15h chiều', 6);
  }

  @Cron('0 20 * * *', { timeZone: 'Asia/Ho_Chi_Minh' })
  async report8pm() {
    await this.sendLeadSummaryReport('20h tối', 5);
  }
}
