import { getSession } from "next-auth/react";
import { connectToDb, User } from '../database/database';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redirect to login if user not logged in
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { email, name } = session.user;
  await connectToDb();

  try {
    let user = await User.findOne({ email });

    // Create new user with the given details
    if (!user) {
      user = new User({ email, name });
      await user.save();
    }

    // Redirect to home page
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function CreateUser() {
  return null;
}
