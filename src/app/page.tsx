import Image from "next/image";

import { ColorBars } from "@/components/color-bars";
import { Timeline } from "@/components/timeline";

const SERVICES = ["Animated explainers", "Product demos", "Launch films"];

function Brackets() {
  const corner =
    "pointer-events-none absolute h-7 w-7 border-paper/18 sm:h-9 sm:w-9";
  return (
    <div aria-hidden>
      <span
        className={`${corner} -top-6 -left-4 border-t border-l sm:-left-8`}
      />
      <span
        className={`${corner} -top-6 -right-4 border-t border-r sm:-right-8`}
      />
      <span
        className={`${corner} -bottom-6 -left-4 border-b border-l sm:-left-8`}
      />
      <span
        className={`${corner} -right-4 -bottom-6 border-r border-b sm:-right-8`}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ColorBars />

      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
        <header className="flex items-center justify-between gap-6">
          {/* Source art carries ~25% padding top and bottom, so the box is
              sized larger than the mark reads. */}
          <Image
            src="/vidiosa-logo.png"
            alt="Vidiosa"
            width={300}
            height={100}
            priority
            className="h-11 w-auto sm:h-14"
          />
          <p className="label text-muted">SaaS video studio</p>
        </header>

        {/* Vertical rhythm keys off viewport height so the frame fits a laptop
            screen without scrolling, and breathes on taller displays. */}
        <main className="flex flex-1 flex-col justify-center py-[clamp(3.5rem,7vh,6rem)]">
          <section className="relative w-full">
            <Brackets />

            <div className="max-w-[54rem]">
              {/* The status is the point of the page, so it gets a chip and a
                  readable size rather than fine print. */}
              <p className="label inline-flex items-center gap-3 border border-flare/35 bg-flare/10 px-4 py-2.5 text-[0.8125rem] text-flare sm:text-sm">
                <span aria-hidden className="block h-2 w-2 bg-flare" />
                Coming soon
              </p>

              <h1 className="display mt-6 text-[clamp(2.5rem,6.8vw,5.25rem)] text-paper">
                SaaS videos that educate, engage, and convert.
              </h1>

              <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-paper/70 sm:text-lg">
                Vidiosa cuts animated explainers, product demos, and launch
                films for SaaS teams. The new site is in the edit. The studio is
                open — bring us a brief.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="mailto:hello@vidiosa.com?subject=Project%20brief"
                  className="label inline-flex items-center justify-center bg-flare px-7 py-4 text-ink transition-colors hover:bg-flare-lift"
                >
                  Start a project
                </a>
                <a
                  href="tel:+13072257167"
                  className="label inline-flex items-center justify-center border border-line px-7 py-4 text-paper/80 transition-colors hover:border-paper/35 hover:text-paper"
                >
                  +1 307 225 7167
                </a>
              </div>
            </div>
          </section>
        </main>

        <Timeline />

        <footer className="mt-[clamp(2rem,4.5vh,3.5rem)] flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
            {SERVICES.map((service, i) => (
              <li key={service} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-3 w-px bg-line" />}
                {service}
              </li>
            ))}
          </ul>
          <div className="label flex flex-wrap items-center gap-x-3 gap-y-2 text-muted">
            <a
              href="mailto:hello@vidiosa.com"
              className="text-paper/75 transition-colors hover:text-flare"
            >
              hello@vidiosa.com
            </a>
            <span aria-hidden className="h-3 w-px bg-line" />
            <span>&copy; {new Date().getFullYear()} Vidiosa</span>
          </div>
        </footer>
      </div>
    </>
  );
}
