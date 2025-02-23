import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleAuthButton } from "./google-auth-button";

export function LoginForm() {
  return (
    <div className="w-full rounded-lg bg-gray-50 py-3 shadow dark:border dark:bg-app-950 sm:max-w-md md:mt-0 lg:max-w-xl">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-5" action="#">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 ms-auto text-sm font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm">Or login with:</p>
          <GoogleAuthButton />
        </div>
        <Separator />
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <a
              href="#"
              className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
