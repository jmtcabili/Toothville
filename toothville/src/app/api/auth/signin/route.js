import connectToDatabase from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { username, password } = await req.json();

  await connectToDatabase();

  const user = await User.findOne({ username });
  if (!user) {
    return new Response(JSON.stringify({ message: "Invalid username or password" }), { status: 401 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return new Response(JSON.stringify({ message: "Invalid username or password" }), { status: 401 });
  }

  return new Response(JSON.stringify({ message: "Sign in successful" }), { status: 200 });
}
