import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { LeadsModule } from './modules/leads/leads.module';
import { SettingsModule } from './modules/settings/settings.module';
import { MentorsModule } from './modules/mentors/mentors.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { BlogPostsModule } from './modules/blog-posts/blog-posts.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { StudentResultsModule } from './modules/student-results/student-results.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { JobPositionsModule } from './modules/job-positions/job-positions.module';
import { JobApplicationsModule } from './modules/job-applications/job-applications.module';
import { MailModule } from './modules/mail/mail.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AcaSchedulesModule } from './modules/aca-schedules/aca-schedules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    AuthModule,
    MailModule,
    UploadModule,
    CoursesModule,
    ProgramsModule,
    LeadsModule,
    SettingsModule,
    MentorsModule,
    TeachersModule,
    TestimonialsModule,
    BlogPostsModule,
    BlogsModule,
    StudentResultsModule,
    SchedulesModule,
    DashboardModule,
    JobPositionsModule,
    JobApplicationsModule,
    AcaSchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
