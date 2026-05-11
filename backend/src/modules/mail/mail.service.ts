import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

type SendMailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly config: ConfigService) {}

  private createTransport() {
    const host = this.config.get<string>('SMTP_HOST');
    const port = Number(this.config.get<string>('SMTP_PORT') ?? 587);
    const user = this.config.get<string>('SMTP_EMAIL');
    const pass = this.config.get<string>('SMTP_PASSWORD');

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
      family: 4,
    });
  }

  async send(options: SendMailOptions) {
    const fromName = this.config.get<string>('FROM_NAME') ?? 'Xalo English';
    const fromEmail = this.config.get<string>('SMTP_EMAIL');
    const from = fromEmail ? `${fromName} <${fromEmail}>` : fromName;

    const transporter = this.createTransport();
    try {
      const info = await transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
      this.logger.log(`Email sent ${info.messageId} to ${options.to}`);
      return info;
    } catch (err: any) {
      this.logger.error(
        `Email send failed to ${options.to}: ${err?.message ?? err}`,
      );
      throw err;
    }
  }
}
