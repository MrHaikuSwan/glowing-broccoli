"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { authenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  // TODO: Should add an animation for login button
  return (
    <div className="w-full max-w-md">
      <form action={dispatch}>
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">
              Business Sign In
            </CardTitle>
          </CardHeader>
          <div className="text-center text-red-400 pb-4">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Company ID"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <LoginButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      onClick={(event) => {
        if (pending) {
          event.preventDefault();
        }
      }}
      className="w-full"
    >
      Sign In
    </button>
  );
}
