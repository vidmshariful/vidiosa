import Image from "next/image";

import { BookingCalendar } from "@/components/booking-calendar";
import { Cursor } from "@/components/cursor";
import { DotWordmark } from "@/components/dot-wordmark";
import { HeroField } from "@/components/hero-field";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { Showreel } from "@/components/showreel";
import { SiteMotion } from "@/components/site-motion";
import { WatchButton } from "@/components/watch-button";
import { BOOK_CALL_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

export default function Home() {
  return (
    <>
      <header className="hdr">
        <div className="wrap flex min-h-20 items-center gap-2 sm:gap-3">
          <a href="#top" className="logo" aria-label="Vidiosa home">
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
          </a>
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
          <a href={BOOK_CALL_URL} className="btn btn-ink btn-sm" data-magnetic>
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
        <section className="relative isolate pt-[clamp(40px,6vw,96px)]">
          <HeroField />
          <div className="wrap">
            <h1 className="h1">
              <span className="line">
                <span>One plan. A full video team.</span>
              </span>
              <span className="line">
                {/* Inner span: the outer one runs the rise animation. */}
                <span>
                  <span className="grad-text grad-flow">Videos every week.</span>
                </span>
              </span>
            </h1>

            <div className="fade-in mt-[clamp(32px,4vw,52px)] grid items-end gap-6 border-t border-line pt-[clamp(28px,3vw,40px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
              <p className="max-w-[62ch] text-[clamp(17px,1.35vw,19px)] leading-[1.55] text-muted">
                Get a full video team for one monthly plan: strategists,
                scriptwriters, designers and motion artists. We plan your
                product and founder videos from your roadmap, make them and ship
                them. No hiring, no salaries, no managing. You just approve.
              </p>
              <div className="hero-ctas flex flex-wrap gap-2.5 lg:justify-end">
                <a href={BOOK_CALL_URL} className="btn btn-ink" data-magnetic>
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

        <Marquee />
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

      <Cursor />
      <SiteMotion />
    </>
  );
}
