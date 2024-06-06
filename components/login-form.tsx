"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  // TODO: Should add an animation for login button
  return (
    <div className="w-full max-w-sm">
      <form action={dispatch}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your Company ID, username and password to login to your
              account
            </CardDescription>
          </CardHeader>
          <div className="text-center text-red-400 pb-4">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Company ID</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="acmecorp"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userid">User ID</Label>
                <Input
                  id="userid"
                  name="userid"
                  type="text"
                  placeholder="johndoe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="1234"
                  required
                />
              </div>
              <div className="pt-8">
                <LoginButton />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      type="submit"
      onClick={(event) => {
        if (pending) {
          event.preventDefault();
        }
      }}
      className="w-full"
    >
      Login
    </Button>
  );
}
