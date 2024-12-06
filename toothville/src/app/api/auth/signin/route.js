import connectToDatabase from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "MOGXqJPX1OP9ogxcmpSrUFlbdA92MfLG3MLSrVbcUg8=";

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

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

  return new Response(
    JSON.stringify({ message: "Sign in successful" }),
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
      },
    }
  );
}
