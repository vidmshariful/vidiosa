import Script from "next/script";

import { roleFormUrl, type Role } from "@/content/careers";
import { BOOKING_EMBED_SCRIPT } from "@/lib/contact";

// The role's HighLevel form, embedded inline. Roles without a form yet say so.
export function ApplyForm({ role }: { role: Role }) {
  const formUrl = roleFormUrl(role);

  if (!formUrl) {
    return (
      <div className="apply-card apply-card-soon">
        <p className="text-[clamp(18px,1.6vw,22px)] font-medium leading-snug">
          Applications for this role open soon.
        </p>
        <p className="text-sm text-muted">
          The application form will appear here once it&apos;s ready.
        </p>
      </div>
    );
  }

  const iframeId = `inline-${role.formId}`;

  return (
    <>
      <div className="apply-card apply-card-form">
        <iframe
          // HighLevel's embed script sizes the form to its content using these.
          id={iframeId}
          src={formUrl}
          title={`Apply for ${role.title}`}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-activation-type="alwaysActivated"
          data-deactivation-type="neverDeactivate"
          data-form-name={role.title}
          data-layout-iframe-id={iframeId}
          data-form-id={role.formId}
        />
        {/* Same GrowxCRM script as the booking calendar; it loads once per page. */}
        <Script src={BOOKING_EMBED_SCRIPT} strategy="afterInteractive" />
      </div>
      <p className="apply-note">
        We review every application personally and will contact shortlisted
        candidates. Form not loading?{" "}
        <a href={formUrl} target="_blank" rel="noopener">
          Open it in a new tab
        </a>
        .
      </p>
    </>
  );
}
