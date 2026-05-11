import 'reflect-metadata';
import 'dotenv/config';
import mongoose from 'mongoose';
import { User, UserSchema } from '../modules/auth/schemas/user.schema';
import bcrypt from 'bcryptjs';

async function main() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error('Missing MONGO_URI');

  const email = (process.env.ADMIN_SEED_EMAIL || '').toLowerCase().trim();
  const password = process.env.ADMIN_SEED_PASSWORD || '';
  const name = process.env.ADMIN_SEED_NAME || 'Admin';

  if (!email || !password) {
    throw new Error('Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD');
  }

  await mongoose.connect(mongoUri);

  const UserModel =
    mongoose.models.User || mongoose.model(User.name, UserSchema);

  const existing = await UserModel.findOne({ email });
  if (existing) {
    existing.isAdmin = true;
    if (name) existing.name = name;
    await existing.save();

    console.log(`Admin ensured: ${email}`);
    await mongoose.disconnect();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  await UserModel.create({ name, email, password: hashed, isAdmin: true });

  console.log(`Admin created: ${email}`);
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});
