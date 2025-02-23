import { LoginForm } from "@/components/forms/login";

export default async function Home() {
  return (
    <section className="flex h-screen flex-col items-center justify-center bg-gray-50 p-3 dark:bg-gray-900">
      <LoginForm />
    </section>
  );
}
