import { connectToDb, User } from "../../database/database";

export default async function test(req, res) {
  //Wrong method

  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  try {
    let requestData = JSON.parse(req.body);
    let userID = requestData["userID"];
    let requestQuiz = requestData["quiz"];

    User.findOneAndUpdate(
      { _id: userID },
      {
        $push: {
          quizzes: {
            name: requestQuiz["name"],
            content: requestQuiz["content"],
          },
        },
      }
    ).exec();

    connectToDb();

    res.status(200).json({ message: "Success" });
  } catch (e) {
    console.log("Error caught");
    console.log(e);
    res.status(500);
    return;
  }

  return;
}
