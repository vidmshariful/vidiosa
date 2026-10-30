import Image from "next/image";
import Link from "next/link";

import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

type Props = {
  // Where the logo goes: "#top" on the home page, "/" everywhere else.
  logoHref?: string;
  cta: { label: string; href: string };
};

export function SiteHeader({ logoHref = "/", cta }: Props) {
  return (
    <header className="hdr">
      <div className="wrap flex min-h-20 items-center gap-2 sm:gap-3">
        <Link href={logoHref} className="logo" aria-label="Vidiosa home">
          {/* Cut from the 578×120 logo: mark 113×120, wordmark 445×120. */}
          <Image
            src="/brand/vidiosa-mark-gradient.png"
            alt=""
            width={113}
            height={120}
            priority
            className="logo-mark"
          />
          <Image
            src="/brand/vidiosa-wordmark-black.png"
            alt="Vidiosa"
            width={445}
            height={120}
            priority
            className="logo-word"
          />
        </Link>
        <a
          href={WHATSAPP_URL}
          className="wa"
          data-magnetic
          aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
        >
          <WhatsAppIcon />
          <span className="roll" data-t={WHATSAPP_DISPLAY}>
            <span>{WHATSAPP_DISPLAY}</span>
          </span>
        </a>
        <a href={cta.href} className="btn btn-ink btn-sm" data-magnetic>
          <span className="roll" data-t={cta.label}>
            <span>{cta.label}</span>
          </span>
          <span className="btn-dot">
            <ArrowIcon size={16} />
          </span>
        </a>
      </div>
    </header>
  );
}
