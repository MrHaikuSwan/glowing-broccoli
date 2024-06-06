"use client";

import { Suspense, useEffect, useState } from "react";
import { EntityOnboarding, MercoaSession } from "@mercoa/react";
import { useSearchParams } from "next/navigation";
import { getEntityStatus } from "@/lib/actions";
import { Mercoa } from "@mercoa/javascript";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// TODO: Refactor code duplication
// TODO: Refactor redundant searchParams usage
function MercoaComponent() {
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();

  const entId = searchParams.get("entId")!;

  useEffect(() => {
    // Call Your Token Generator Endpoint
    fetch(`/api/generateMercoaToken?${searchParams}`).then(async (resp) => {
      if (resp.status === 200) {
        setToken((await resp.json()).token);
      } else {
        console.log(resp);
      }
    });
  }, []);

  // NOTE: Had to add this myself, example from the docs didn't work nicely
  if (token === "") {
    return null;
  }

  return (
    <MercoaSession token={token}>
      <EntityOnboarding entityId={entId} type="payor"></EntityOnboarding>
    </MercoaSession>
  );
}

function Welcome() {
  return (
    <div className="h-screen">
      <Card className="mx-auto w-lg max-w-lg p-6 bg-white dark:bg-gray-950 rounded-xl shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Welcome Aboard!</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Your business has been verified! You're all set to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <ul className="space-y-2 text-left">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Create and track your current invoices</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Manage your vendor information</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <span>Define powerful invoice approval rules</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function CheckIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Home({
  searchParams,
}: {
  searchParams: { entId: string; userId: string };
}) {
  const [status, setStatus] = useState("");
  const entId = searchParams.entId;

  useEffect(() => {
    getEntityStatus(entId).then((value) => setStatus(value));
  }, []);

  return (
    <div>
      {status !== "" &&
        (status === "verified" ? (
          <>
            <Welcome />
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <Suspense>
              <MercoaComponent />
            </Suspense>
          </>
        ) : (
          <Suspense>
            <MercoaComponent />
          </Suspense>
        ))}
    </div>
  );
}
