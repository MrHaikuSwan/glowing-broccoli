import SideNav from "@/components/side-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideNav />
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
