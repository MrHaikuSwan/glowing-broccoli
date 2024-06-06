"use client";

import "@mercoa/react/dist/style.css";
import { MercoaSession, PayablesTable } from "@mercoa/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface DashboardProps {
  searchParams: {
    entId: string;
  };
}

export default function Dashboard({ searchParams }: DashboardProps) {
  // const [token, setToken] = useState("");

  // console.log(token);

  // useEffect(() => {
  //   fetch(`/api/generateMercoaToken?entId=${searchParams.entId!}`)
  //     .then((res) => res.json())
  //     .then((value) => {
  //       setToken(value.token);
  //     });
  // }, []);

  // NOTE: HARDCODED
  let hardtoken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6Im9yZ190ZXN0XzAxZmUxZDdmLWRiY2MtNDA5OC04MTAyLTRkMzFhM2IwNmQyNyIsImVudGl0eUlkIjoiZW50X2NlZDQ3NTY3LTExM2QtNDU5My1iZWQxLWNhZDlkYzcwNmQwNCIsIm9wdGlvbnMiOnsiZXhwaXJlc0luIjoiMjRociJ9LCJtb292Ijp7InRva2VuIjoic2FuZGJveCIsImFjY291bnRJZCI6InNhbmRib3gifSwiaWF0IjoxNzE3NjMzMDYzLCJleHAiOjE3MTc3MTk0NjN9.zHJYs996hpeO-qimSZemYTGeGBLVfnHucS-W1S8gL8g`;

  return (
    <div className="pt-10">
      <MercoaSession token={hardtoken} />
    </div>
  );
}
