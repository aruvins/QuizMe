import mongoose from 'mongoose';

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


// Create schema for users collection
const userSchema = new mongoose.Schema({
  _id: Number,
  access_token: String,
  first_name: String,
  last_name: String,
  history: [
    {
      article: String,
      questions: [
        {
          question: String,
          user_guess: String,
          is_guess_correct: Boolean,
          model_response: String,
        },
      ],
    },
  ],
  preferences: {
    dark_mode: Boolean,
  },
});

// Prevent recompilation during HMR
export const User = mongoose.models.user || mongoose.model('user', userSchema);


