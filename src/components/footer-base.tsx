import Link from "next/link";

import { DotWordmark } from "@/components/dot-wordmark";

// The bottom of every dark footer: the dotted wordmark and the small print.
export function FooterBase() {
  return (
    <>
      <div className="mt-[clamp(64px,8vw,112px)] border-t border-white/12 pt-[clamp(28px,3vw,40px)]">
        <DotWordmark />
      </div>
      <div className="mt-6 flex flex-wrap justify-between gap-4 text-[13px] text-muted-dark">
        <span>&copy; {new Date().getFullYear()} Vidiosa LLC</span>
        <span className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/careers" className="transition-colors hover:text-paper">
            Careers: we&apos;re hiring
          </Link>
          <span>Human-directed, AI-accelerated.</span>
        </span>
      </div>
    </>
  );
}
