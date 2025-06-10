// app/auth/page.tsx
import { AuthForm } from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">Welcome Back!</h1>
      <AuthForm />
    </main>
  );
}
