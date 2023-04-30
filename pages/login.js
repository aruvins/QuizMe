import { signIn } from "next-auth/react";

function GoogleSignInButton() {
  return (
    <button onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  );
}

export default function Home() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <GoogleSignInButton />
    </div>
  );
}

