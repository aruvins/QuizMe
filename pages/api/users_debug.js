// Debug database connection

import {connectToDb, User} from '../../database/database';

export default async function handler(req, res) {
  await connectToDb();

  if (req.method === 'GET') {
    const users = await User.find({});
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}