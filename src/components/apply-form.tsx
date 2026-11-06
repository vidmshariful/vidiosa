"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

import { roleSurveyUrl, type Role } from "@/content/careers";
import { BOOKING_EMBED_SCRIPT } from "@/lib/contact";

// A height change this large means a new survey step, not a validation message.
const STEP_CHANGE_PX = 100;

// The role's HighLevel survey, embedded inline. Roles without one yet say so.
export function ApplyForm({ role }: { role: Role }) {
  const surveyUrl = roleSurveyUrl(role);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The survey can't scroll the pop-up, so a new step could open partway down.
  // Its frame is resized for each step: when that happens above the fold, bring
  // the top of the survey back into view.
  useEffect(() => {
    const frame = frameRef.current;
    const panel = frame?.closest(".modal-panel");
    if (!frame || !panel) return;

    let lastHeight = frame.offsetHeight;
    const observer = new ResizeObserver(() => {
      const height = frame.offsetHeight;
      const offset = frame.getBoundingClientRect().top - panel.getBoundingClientRect().top;
      if (Math.abs(height - lastHeight) >= STEP_CHANGE_PX && offset < 0) {
        panel.scrollBy({ top: offset });
      }
      lastHeight = height;
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, [surveyUrl]);

  if (!surveyUrl) {
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

  return (
    <>
      <div className="apply-card apply-card-form">
        <iframe
          ref={frameRef}
          // HighLevel's embed script sizes the survey to its content using this id.
          id={role.surveyId}
          src={surveyUrl}
          title={`Apply for ${role.title}`}
          scrolling="no"
        />
        {/* Same GrowxCRM script as the booking calendar; it loads once per page. */}
        <Script src={BOOKING_EMBED_SCRIPT} strategy="afterInteractive" />
      </div>
      <p className="apply-note">
        We review every application personally and will contact shortlisted
        candidates. Form not loading?{" "}
        <a href={surveyUrl} target="_blank" rel="noopener">
          Open it in a new tab
        </a>
        .
      </p>
    </>
  );
}
