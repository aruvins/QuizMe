import { User, connectToDb } from "../../database/database";

export default async function test(req, res) {
  // const test = new User({
  //   _id: 0,
  //   name: "test",
  //   quizzes: [],
  // });

  // User.findOneAndUpdate(
  //   { _id: 0 },
  //   {
  //     $push: {
  //       quizzes: {
  //         name: "test quiz",
  //         content: [
  //           { question: "Test question", answer: "Test answer" },
  //           { question: "another one", answer: "anotha one" },
  //         ],
  //       },
  //     },
  //   }
  // ).exec();
  // test.quizzes.push({name:"test quiz"}, [{question: "Test question", answer: "Test answer"},{question: "another one", answer: "anotha one"}], {_id: 1})
  // // quizzes: [
  //   {
  //       id: Number,
  //       questions: [questionAnswerSchema],
  //   },
  // ],

  connectToDb();
  let data = await User.find();

  res.status(200).json(data);
}
