"use client";

import { Suspense, useEffect, useState } from "react";
import { EntityOnboarding, MercoaSession } from "@mercoa/react";
import { useSearchParams } from "next/navigation";

function MercoaComponent() {
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();

  const entId = searchParams.get("entId")!;

  useEffect(() => {
    // Call Your Token Generator Endpoint
    fetch(
      `/api/generateMercoaToken?${new URLSearchParams({
        entId,
      })}`
    ).then(async (resp) => {
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

export default function Approval() {
  return (
    <Suspense>
      <MercoaComponent />
    </Suspense>
  );
}
