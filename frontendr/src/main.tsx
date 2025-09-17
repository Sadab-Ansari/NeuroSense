import { createRoot } from "react-dom/client";
import { ClerkProvider } from '@clerk/clerk-react';
import App from "./App.tsx";
import "./index.css";
import { env, validateEnv } from "./lib/env";

// Validate environment variables
validateEnv();

// Import your publishable key
const PUBLISHABLE_KEY = env.CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    signInUrl="/"
    signUpUrl="/"
    afterSignInUrl="/dashboard"
    afterSignUpUrl="/dashboard"
  >
    <App />
  </ClerkProvider>
);
