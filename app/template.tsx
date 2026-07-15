import { PageFlash } from "@/components/site/PageFlash";

/**
 * Templates remount on every route change (unlike layouts), which is what
 * lets PageFlash fire its camera-flash transition per navigation.
 */
export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <PageFlash />
    </>
  );
}
