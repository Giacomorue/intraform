import NavbarAdmin from "@/components/admin/NavbarAdmin";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  return (
    <>
      <NavbarAdmin />
      <div className="w-[100vw]">
        {children}
      </div>
    </>
  );
}

export default DashboardLayout;