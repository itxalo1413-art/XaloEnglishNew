import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lead, LeadSchema } from './schemas/lead.schema';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { LeadsReporter } from './leads.reporter';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
    MailModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService, LeadsReporter],
  exports: [LeadsService],
})
export class LeadsModule {}
