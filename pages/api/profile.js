import {getSession} from "next-auth/react";
import {connectToDb, User} from '../../database/database';

export default async function handler(req, res) {
  // Get the user's session
  const session = await getSession({ req });

  // If the user is not authenticated, return an error
  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  // Connect to the database
  const db = await connectToDb();

  // Find the user based on their email address
  const user = await User.findOne({ email: session.user.email }).lean();

  // Return the user's information
  res.status(200).json({ user });
}

