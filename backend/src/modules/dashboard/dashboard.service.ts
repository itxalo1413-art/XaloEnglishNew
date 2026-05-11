import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from '../leads/schemas/lead.schema';
import { BlogPost } from '../blog-posts/schemas/blog-post.schema';
import { ProgramGroup } from '../programs/schemas/program-group.schema';
import { StudentResult } from '../student-results/schemas/student-result.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<Lead>,
    @InjectModel(BlogPost.name) private readonly blogPostModel: Model<BlogPost>,
    @InjectModel(ProgramGroup.name)
    private readonly programGroupModel: Model<ProgramGroup>,
    @InjectModel(StudentResult.name)
    private readonly studentResultModel: Model<StudentResult>,
  ) {}

  async getStats() {
    const [leadCount, blogCount, programCount, resultCount] = await Promise.all(
      [
        this.leadModel.countDocuments({}),
        this.blogPostModel.countDocuments({}),
        this.programGroupModel.countDocuments({}),
        this.studentResultModel.countDocuments({}),
      ],
    );

    const recentLeads = await this.leadModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5);

    return {
      counts: {
        leads: leadCount,
        blogs: blogCount,
        programs: programCount,
        results: resultCount,
      },
      recentLeads,
    };
  }
}
