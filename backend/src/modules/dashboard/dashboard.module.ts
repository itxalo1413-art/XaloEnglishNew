import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Lead, LeadSchema } from '../leads/schemas/lead.schema';
import {
  BlogPost,
  BlogPostSchema,
} from '../blog-posts/schemas/blog-post.schema';
import {
  ProgramGroup,
  ProgramGroupSchema,
} from '../programs/schemas/program-group.schema';
import {
  StudentResult,
  StudentResultSchema,
} from '../student-results/schemas/student-result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lead.name, schema: LeadSchema },
      { name: BlogPost.name, schema: BlogPostSchema },
      { name: ProgramGroup.name, schema: ProgramGroupSchema },
      { name: StudentResult.name, schema: StudentResultSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
