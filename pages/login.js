import { signIn } from "next-auth/react";

function GoogleSignInButton() {
  return (
    // After filling in credentials, user will be redirected to the `create-user` page, which automatically
    // creates a new user and then redirects to the home page
    <button onClick={() => signIn("google", {callbackUrl: `${window.location.origin}/create-user`})}>
      Sign in with Google
    </button>
  );
}

export default function Home() {
  return (
    <div>
      <h1>Please sign in</h1>
      <GoogleSignInButton />
    </div>
  );
}

