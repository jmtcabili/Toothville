import connectToDatabase from '@/utils/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();
  await connectToDatabase();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return new Response('User already exists', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    password: hashedPassword,
  });
  await newUser.save();

  return new Response('User created', { status: 201 });
}
