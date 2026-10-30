import type { Metadata } from "next";
import Link from "next/link";

import { CareersEnd } from "@/components/careers-end";
import { Cursor } from "@/components/cursor";
import { HeroField } from "@/components/hero-field";
import { ArrowIcon, PlayIcon } from "@/components/icons";
import { RoleList } from "@/components/role-list";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { ROLES, TEAMS } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: `Vidiosa is hiring for ${ROLES.length} roles, on-site or remote: video editors, motion designers, marketers, project managers and more.`,
  alternates: { canonical: "/careers" },
};

export default function Careers() {
  const teams = TEAMS.map((team) => ({
    team,
    roles: ROLES.filter((role) => role.team === team),
  })).filter((group) => group.roles.length > 0);

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
              <p className="max-w-[62ch] text-[clamp(17px,1.35vw,19px)] leading-[1.55] text-muted">
                Vidiosa is a studio of strategists, writers, designers, editors
                and motion artists making product and founder videos for SaaS
                teams. We&apos;re hiring for {ROLES.length} roles right now, on-site
                or remote.
              </p>
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

          {teams.map(({ team, roles }) => (
            <div key={team} className="team reveal">
              <h3 className="team-h">
                {team}
                <span className="team-n">{roles.length}</span>
              </h3>
              <RoleList roles={roles} />
            </div>
          ))}
        </section>
      </main>

      <CareersEnd />

      <Cursor />
      <SiteMotion />
    </>
  );
}
