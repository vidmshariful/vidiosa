import Image from "next/image";

import { BookingCalendar } from "@/components/booking-calendar";
import { DotWordmark } from "@/components/dot-wordmark";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { Showreel } from "@/components/showreel";
import { WatchButton } from "@/components/watch-button";
import { BOOK_CALL_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

const MAKES = [
  "Launch films",
  "Product demos",
  "Explainers",
  "Founder clips",
  "Onboarding videos",
];

function MarqueeSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-set" aria-hidden={hidden || undefined}>
      {MAKES.map((item) => (
        <span key={item} className="contents">
          <span>{item}</span>
          <Image
            src="/brand/vidiosa-mark-black.png"
            alt=""
            width={109}
            height={116}
          />
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="hdr">
        <div className="wrap flex min-h-20 items-center gap-3">
          <a href="#top" aria-label="Vidiosa home">
            {/* Source art is 578×120. */}
            <Image
              src="/brand/vidiosa-logo-black.png"
              alt="Vidiosa"
              width={578}
              height={120}
              priority
              className="h-[30px] w-auto"
            />
          </a>
          <a
            href={WHATSAPP_URL}
            className="wa"
            aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
          >
            <WhatsAppIcon />
            <span className="roll" data-t={WHATSAPP_DISPLAY}>
              <span>{WHATSAPP_DISPLAY}</span>
            </span>
          </a>
          <a href={BOOK_CALL_URL} className="btn btn-ink btn-sm">
            <span className="roll" data-t="Book a call">
              <span>Book a call</span>
            </span>
            <span className="btn-dot">
              <ArrowIcon size={16} />
            </span>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="pt-[clamp(40px,6vw,96px)]">
          <div className="wrap">
            <h1 className="h1">
              <span className="line">
                <span>One plan. A full video team.</span>
              </span>
              <span className="line">
                <span className="grad-text">Videos every week.</span>
              </span>
            </h1>

            <div className="fade-in mt-[clamp(32px,4vw,52px)] grid items-end gap-6 border-t border-line pt-[clamp(28px,3vw,40px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
              <p className="max-w-[62ch] text-[clamp(17px,1.35vw,19px)] leading-[1.55] text-muted">
                Get a full video team for one monthly plan: strategists,
                scriptwriters, designers and motion artists. We plan your
                product and founder videos from your roadmap, make them and ship
                them. No hiring, no salaries, no managing. You just approve.
              </p>
              <div className="flex flex-wrap gap-2.5 lg:justify-end">
                <a href={BOOK_CALL_URL} className="btn btn-ink">
                  <span className="roll" data-t="Book a call">
                    <span>Book a call</span>
                  </span>
                  <span className="btn-dot">
                    <ArrowIcon />
                  </span>
                </a>
                <WatchButton />
              </div>
            </div>
          </div>
        </section>

        <Showreel />

        <div className="marquee" aria-label="What we make">
          <div className="marquee-track">
            <MarqueeSet />
            <MarqueeSet hidden />
          </div>
        </div>
      </main>

      <footer className="end">
        <div className="mx-auto max-w-[1376px]">
          <div className="reveal flex flex-col gap-7">
            <span className="tag">Book a call</span>
            <h2 className="end-h">
              Let&apos;s plan your{" "}
              <span className="grad-text">first month.</span>
            </h2>
          </div>
          <BookingCalendar />
          <div className="mt-[clamp(64px,8vw,112px)] border-t border-white/12 pt-[clamp(28px,3vw,40px)]">
            <DotWordmark />
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-4 text-[13px] text-muted-dark">
            <span>&copy; {new Date().getFullYear()} Vidiosa LLC</span>
            <span>Human-directed, AI-accelerated.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
