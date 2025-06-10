"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase-client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isSignup = mode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let userCredential: UserCredential;

      if (isSignup) {
        // יצירת משתמש חדש
        userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // עדכון שם מלא בפרופיל
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: fullName });
        }
      } else {
        // התחברות משתמש קיים
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      // כאן אפשר להוסיף לוגיקה נוספת אם רוצים (למשל לשלוח טוקן לשרת, לאתחל סטייט וכו')

      // ניווט ל-dashboard
      router.push("/dashboard");
    } catch (error: any) {
      // טיפול בשגיאות Firebase
      let message = "Something went wrong";

      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            message = "Email already in use";
            break;
          case "auth/invalid-email":
            message = "Invalid email address";
            break;
          case "auth/weak-password":
            message = "Password should be at least 6 characters";
            break;
          case "auth/user-not-found":
            message = "User not found";
            break;
          case "auth/wrong-password":
            message = "Incorrect password";
            break;
          default:
            message = error.message || message;
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignup && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required={isSignup}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 text-white py-2 text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => {
            setError(null);
            setMode(isSignup ? "login" : "signup");
          }}
          className="text-blue-600 hover:underline focus:outline-none"
          type="button"
        >
          {isSignup ? "Log In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
