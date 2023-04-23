import { User, connectToDb } from "../../database/database";

export default async function handler(req, res) {
  //Wrong method
  if (req.method !== "POST") {
    res.status(405);
    return;
  }
  try {
    let userID = JSON.parse(req.body)["userID"];
    connectToDb();
    let userData = await User.findById(userID).exec();
    const userQuizzes = userData.quizzes;
    res.status(200).json(userQuizzes);
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({message: e});
    return;
  }
}