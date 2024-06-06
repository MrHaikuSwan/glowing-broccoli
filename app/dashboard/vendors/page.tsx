"use client";

import { Suspense, useEffect, useState } from "react";
import { Counterparties, MercoaSession } from "@mercoa/react";
import { useSearchParams } from "next/navigation";

function MercoaComponent() {
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    // Call Your Token Generator Endpoint
    fetch(
      `/api/generateMercoaToken?${new URLSearchParams({
        entId: searchParams.get("entId")!,
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
      <Counterparties type="payee" />
    </MercoaSession>
  );
}

export default function Vendors() {
  return (
    <div className="mx-auto px-8">
      <Suspense>
        <MercoaComponent />
      </Suspense>
    </div>
  );
}
