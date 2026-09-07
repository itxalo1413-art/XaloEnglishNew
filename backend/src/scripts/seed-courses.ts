import 'reflect-metadata';
import 'dotenv/config';
import mongoose from 'mongoose';
import { Course, CourseSchema } from '../modules/courses/schemas/course.schema';
import { DEFAULT_COURSES } from '../modules/courses/courses.defaults';

async function main() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('Missing MONGO_URI');

  await mongoose.connect(mongoUri);
  const CourseModel =
    mongoose.models.Course || mongoose.model(Course.name, CourseSchema);

  let created = 0;
  let skipped = 0;
  for (const dto of DEFAULT_COURSES) {
    const exists = await CourseModel.findOne({ slug: dto.slug });
    if (exists) {
      skipped += 1;
      continue;
    }
    await CourseModel.create({
      ...dto,
      slug: dto.slug,
      is_active: dto.is_active ?? true,
    });
    created += 1;
  }

  console.log(`Courses seed done: created=${created}, skipped=${skipped}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
