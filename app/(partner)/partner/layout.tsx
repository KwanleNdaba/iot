import PartnerLayout from "@/components/sidebar/PartnerLayout";
import { Suspense } from "react";


export default function PartnerLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>
      <PartnerLayout>{children}</PartnerLayout>;
  </Suspense>
}