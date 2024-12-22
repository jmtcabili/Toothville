import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import { appCodeModel } from '@/app/lib/db';
import bcrypt from 'bcryptjs';

await connectToDatabase();

export async function POST(req) {
  const { username, inputCode, password } = await req.json();
  
  const existingUser = await User.findOne({ username });
  const appCode = await appCodeModel.findOne();
  const validCode = await bcrypt.compare(inputCode, appCode.code);

  if (existingUser) {
    return new Response('User already exists', { status: 400 });
  }
  if (!validCode) {
    return new Response('Invalid code', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    password: hashedPassword,
  });
  await newUser.save();

  return new Response('User created', { status: 201 });
}
