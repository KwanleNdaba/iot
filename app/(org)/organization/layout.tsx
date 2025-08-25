import AppLayout from "@/components/sidebar/AppLayout";
import { Suspense } from "react";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>
    <AppLayout>{children}</AppLayout>;
  </Suspense>
}