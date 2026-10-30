import { BookingCalendar } from "@/components/booking-calendar";
import { Cursor } from "@/components/cursor";
import { FooterBase } from "@/components/footer-base";
import { HeroField } from "@/components/hero-field";
import { ArrowIcon } from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { Showreel } from "@/components/showreel";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { WatchButton } from "@/components/watch-button";
import { BOOK_CALL_URL } from "@/lib/contact";

export default function Home() {
  return (
    <>
      <SiteHeader logoHref="#top" cta={{ label: "Book a call", href: BOOK_CALL_URL }} />

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
          <FooterBase />
        </div>
      </footer>

      <Cursor />
      <SiteMotion />
    </>
  );
}
