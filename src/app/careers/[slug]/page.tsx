import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplyForm } from "@/components/apply-form";
import { CareersEnd } from "@/components/careers-end";
import { Cursor } from "@/components/cursor";
import { ArrowIcon } from "@/components/icons";
import { RoleList } from "@/components/role-list";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { getRole, LOCATION, ROLES } from "@/content/careers";

// Only the roles listed in content exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const role = getRole((await params).slug);
  if (!role) return {};
  return {
    title: `${role.title}, careers`,
    description: `${role.summary} ${LOCATION}.`,
    alternates: { canonical: `/careers/${role.slug}` },
  };
}

export default async function RolePage({ params }: PageProps<"/careers/[slug]">) {
  const role = getRole((await params).slug);
  if (!role) notFound();

  const others = ROLES.filter((other) => other.slug !== role.slug);

  return (
    <>
      <SiteHeader cta={{ label: "Apply now", href: "#apply" }} />

      <main className="wrap pt-[clamp(28px,4vw,56px)]">
        <Link href="/careers" className="back-link">
          <ArrowIcon size={14} className="-rotate-135" />
          All open roles
        </Link>

        <div className="role-hero fade-in">
          <span className="tag">Open role</span>
          <h1 className="role-h">{role.title}</h1>
          <ul className="role-chips" aria-label="Role details">
            <li>{LOCATION}</li>
            <li>{role.team}</li>
          </ul>
        </div>

        <div className="role-body">
          <section aria-labelledby="about-role" className="role-about reveal">
            <h2 id="about-role" className="role-sub">
              About the role
            </h2>
            <p>{role.summary}</p>
            <p>
              Show us your work: a portfolio, a reel or links to things you have
              made. We read every application.
            </p>
          </section>

          <section id="apply" aria-labelledby="apply-title" className="role-apply">
            <h2 id="apply-title" className="role-sub">
              Apply for this role
            </h2>
            <ApplyForm role={role} />
          </section>
        </div>

        <section aria-labelledby="other-roles" className="role-others">
          <h2 id="other-roles" className="role-sub">
            Other open roles
          </h2>
          <RoleList roles={others} />
        </section>
      </main>

      <CareersEnd />

      <Cursor />
      <SiteMotion />
    </>
  );
}
