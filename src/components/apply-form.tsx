import Script from "next/script";

import { ArrowIcon } from "@/components/icons";
import { applyByEmailUrl, type Role } from "@/content/careers";
import { BOOKING_EMBED_SCRIPT, EMAIL } from "@/lib/contact";

// The role's HighLevel form when it has one; otherwise a clear email fallback so
// people can apply from day one.
export function ApplyForm({ role }: { role: Role }) {
  if (role.formUrl) {
    return (
      <div className="apply-card">
        <iframe
          // The embed script resizes HighLevel iframes; it keys off this id.
          id={role.formId}
          src={role.formUrl}
          title={`Apply for ${role.title}`}
          scrolling="no"
        />
        {/* Same GrowxCRM script as the booking calendar; it loads once per page. */}
        <Script src={BOOKING_EMBED_SCRIPT} strategy="afterInteractive" />
      </div>
    );
  }

  return (
    <div className="apply-card apply-card-email">
      <p className="text-[clamp(18px,1.6vw,22px)] font-medium leading-snug">
        Send your CV and portfolio or reel, with a few lines about you and why
        this role fits.
      </p>
      <a href={applyByEmailUrl(role)} className="btn btn-ink" data-magnetic>
        <span className="roll" data-t="Apply by email">
          <span>Apply by email</span>
        </span>
        <span className="btn-dot">
          <ArrowIcon />
        </span>
      </a>
      <p className="text-sm text-muted">
        Goes to {EMAIL}, with the role in the subject line.
      </p>
    </div>
  );
}
