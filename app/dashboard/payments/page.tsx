"use client";

import { Suspense, useEffect, useState } from "react";
import { EntityPortal, MercoaSession } from "@mercoa/react";
import { useSearchParams } from "next/navigation";

function MercoaComponent() {
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();

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
      <EntityPortal token={token} />
    </MercoaSession>
  );
}

export default function Payments() {
  return (
    <Suspense>
      <MercoaComponent />
    </Suspense>
  );
}
