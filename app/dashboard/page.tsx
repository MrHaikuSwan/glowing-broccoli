import { Suspense } from "react";
import MercoaComponent from "@/components/mercoa-component";

export default function Home() {
  return (
    <Suspense>
      <MercoaComponent />;
    </Suspense>
  );
}
