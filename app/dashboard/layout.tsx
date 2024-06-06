import "@mercoa/react/dist/style.css";
import SideNav from "@/components/side-nav";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense>
        <SideNav />
      </Suspense>
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">
          <div className="pt-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
