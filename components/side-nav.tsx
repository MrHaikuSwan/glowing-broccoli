"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const links = [
  { text: "Home", href: "/dashboard" },
  { text: "Payments", href: "/dashboard/payments" },
  { text: "Vendors", href: "/dashboard/vendors" },
  { text: "Approval Rules", href: "/dashboard/approval" },
];

// TODO: This shouldn't be a client component, use prop drilling workaround
// TODO: Maybe just define in app/dashboard/layout.tsx?
export default function SideNav() {
  const searchParams = useSearchParams();
  const entId = searchParams.get("entId");

  return (
    <div className="hidden shadow-md md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col p-5">
      <div className="inline-flex">
        <Image
          src="/placeholder-logo-7.png"
          alt="Customer logo"
          width={248}
          height={105}
        />
      </div>
      <div className="flex flex-col space-y-2 pt-6">
        {links.map(({ text, href }) => (
          <Link
            key={text}
            href={`${href}?entId=${entId}`}
            className="text-gray-700 text-md p-2 pl-4 mt-2 rounded-lg hover:bg-gray-100 font-semibold"
          >
            {text}
          </Link>
        ))}
      </div>
      <div>{/* User Profile (extension) */}</div>
    </div>
  );
}
