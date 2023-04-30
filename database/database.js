import mongoose from "mongoose";
// Setup DB connection
const connection = {};

export async function connectToDb() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;

  console.log("Database connection established.");
}

var questionAnswerSchema = new mongoose.Schema(
  { question: String, answer: String },
  { noId: true }
);

const quizID = new mongoose.Schema(
  {
    quizID: {type: mongoose.Schema.Types.ObjectId, index: true, required: true, auto: true}
  }
);

// Create schema for users collection
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  quizzes: [
    {
      name: String,
      content: [questionAnswerSchema],
    },
  ],
});

// Prevent recompilation during HMR
export const User = mongoose.models.user || mongoose.model("user", userSchema);
