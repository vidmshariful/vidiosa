import type { Metadata } from "next";
import Link from "next/link";

import { CareersBoard } from "@/components/careers-board";
import { CareersEnd } from "@/components/careers-end";
import { Cursor } from "@/components/cursor";
import { HeroField } from "@/components/hero-field";
import { ArrowIcon, PlayIcon } from "@/components/icons";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { EMPLOYMENT, LOCATION, PERKS, ROLES } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: `Vidiosa is hiring for ${ROLES.length} full-time roles, on-site in Savar DOHS: motion designers, designers, video editors, marketers, client success, sales and operations.`,
  alternates: { canonical: "/careers" },
};

export default function Careers() {
  return (
    <>
      <SiteHeader cta={{ label: "See open roles", href: "#roles" }} />

      <main>
        <section className="relative isolate pt-[clamp(40px,6vw,96px)]">
          <HeroField />
          <div className="wrap">
            <h1 className="h1">
              <span className="line">
                <span>Join the team behind</span>
              </span>
              <span className="line">
                {/* Inner span: the outer one runs the rise animation. */}
                <span>
                  <span className="grad-text grad-flow">videos every week.</span>
                </span>
              </span>
            </h1>

            <div className="fade-in mt-[clamp(32px,4vw,52px)] grid items-end gap-6 border-t border-line pt-[clamp(28px,3vw,40px)] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
              <div className="flex flex-col gap-5">
                <p className="max-w-[62ch] text-[clamp(17px,1.35vw,19px)] leading-[1.55] text-muted">
                  Vidiosa is a SaaS video and motion design studio. We make
                  animated explainers, product demos and launch films that help
                  software companies explain their products clearly and sell
                  them. Our full-time team of designers, animators, editors,
                  marketers and producers works together from our studio in
                  Savar DOHS. If you care about clear storytelling and well-made
                  work, we&apos;d like to hear from you.
                </p>
                <ul className="role-chips" aria-label="About these roles">
                  <li className="role-chip-pay">{ROLES.length} open roles</li>
                  <li>{EMPLOYMENT}</li>
                  <li>{LOCATION}</li>
                  <li>Salaries in BDT, per month</li>
                </ul>
              </div>
              <div className="hero-ctas flex flex-wrap gap-2.5 lg:justify-end">
                <a href="#roles" className="btn btn-ink" data-magnetic>
                  <span className="roll" data-t="See open roles">
                    <span>See open roles</span>
                  </span>
                  <span className="btn-dot">
                    <ArrowIcon />
                  </span>
                </a>
                <Link href="/#showreel" className="btn btn-line" data-magnetic>
                  <span className="btn-play">
                    <PlayIcon />
                  </span>
                  <span className="roll" data-t="See our work">
                    <span>See our work</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="perks-title" className="wrap pt-[clamp(56px,7vw,104px)]">
          <div className="perks reveal">
            <h2 id="perks-title" className="tag">
              What you&apos;ll get
            </h2>
            <ul className="perks-grid">
              {PERKS.map((perk, i) => (
                <li key={perk.title}>
                  <span className="perk-n grad-text">0{i + 1}</span>
                  <h3>{perk.title}</h3>
                  <p>{perk.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="roles"
          aria-labelledby="roles-title"
          className="wrap roles pb-[clamp(72px,9vw,128px)]"
        >
          <div className="roles-head">
            <h2 id="roles-title" className="sec-h">
              Open roles
            </h2>
            <span className="roles-count">{ROLES.length}</span>
          </div>

          <CareersBoard />
        </section>
      </main>

      <CareersEnd />

      <Cursor />
      <SiteMotion />
    </>
  );
}
