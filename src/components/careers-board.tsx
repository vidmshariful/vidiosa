"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ApplyForm } from "@/components/apply-form";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import {
  EMPLOYMENT,
  getRole,
  LOCATION,
  PERKS,
  roleImage,
  ROLES,
  TEAMS,
  type Team,
} from "@/content/careers";

type Filter = Team | "All";

const CLOSE_MS = 240; // matches the modal-out animation in globals.css

// Role cards with team filters. A card opens a pop-up with the role's details
// and its application; the URL becomes /careers?role=<slug> so it can be shared.
export function CareersBoard() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  // The pop-up shows the role first; "Apply now" swaps in the application form.
  const [view, setView] = useState<"details" | "apply">("details");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const role = openSlug ? getRole(openSlug) : undefined;
  const shown = filter === "All" ? ROLES : ROLES.filter((r) => r.team === filter);

  const open = (slug: string) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setClosing(false);
    setView("details");
    setOpenSlug(slug);
    window.history.replaceState(null, "", `?role=${slug}`);
  };

  const close = useCallback(() => {
    setClosing(true);
    window.history.replaceState(null, "", window.location.pathname);
    window.setTimeout(() => {
      setOpenSlug(null);
      setClosing(false);
      setView("details");
      returnFocus.current?.focus();
    }, CLOSE_MS);
  }, []);

  // A shared link (/careers?role=<slug>) opens that role on arrival. Old slugs
  // resolve to the role that replaced them, and the address is corrected.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("role");
    const found = slug ? getRole(slug) : undefined;
    if (!found) return;
    // A timer rather than a frame, so a link opened in a background tab works too.
    const id = window.setTimeout(() => {
      setOpenSlug(found.slug);
      if (found.slug !== slug) window.history.replaceState(null, "", `?role=${found.slug}`);
    });
    return () => window.clearTimeout(id);
  }, []);

  // While open: lock page scroll, close on Escape, keep Tab inside the pop-up.
  useEffect(() => {
    if (!openSlug) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [openSlug, close]);

  const showView = (next: "details" | "apply") => {
    setView(next);
    panelRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus();
  };

  const applyButton = (
    <button type="button" className="btn btn-ink" onClick={() => showView("apply")}>
      <span className="roll" data-t="Apply now">
        <span>Apply now</span>
      </span>
      <span className="btn-dot">
        <ArrowIcon size={16} />
      </span>
    </button>
  );

  return (
    <>
      <div className="job-filters" role="group" aria-label="Filter roles by team">
        {(["All", ...TEAMS] as Filter[]).map((option) => {
          const count =
            option === "All"
              ? ROLES.length
              : ROLES.filter((r) => r.team === option).length;
          return (
            <button
              key={option}
              type="button"
              className="pill"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
              <span className="pill-n">{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="job-grid">
        {shown.map((r) => (
          <li key={r.slug}>
            <button
              type="button"
              className="job-card"
              aria-haspopup="dialog"
              onClick={() => open(r.slug)}
            >
              <span className="job-img">
                <Image
                  src={roleImage(r)}
                  alt=""
                  fill
                  sizes="(min-width: 1001px) 30vw, (min-width: 641px) 45vw, 92vw"
                />
              </span>
              <span className="job-body">
                <span className="job-team">{r.team}</span>
                <span className="job-title">{r.title}</span>
                <span className="job-exp">{r.experience}</span>
                <span className="job-sum">{r.summary}</span>
                <span className="job-pay">{r.salary}</span>
              </span>
              <span className="job-foot">
                <span>
                  {r.surveyId ? "View role and apply" : "View role"}
                  <span className="job-loc">
                    {r.surveyId ? `${EMPLOYMENT} · ${LOCATION}` : "Applications open soon"}
                  </span>
                </span>
                <span className="job-go" aria-hidden>
                  <ArrowIcon size={16} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {role && (
        <div
          className={`modal${closing ? " is-closing" : ""}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={panelRef}
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-dialog-title"
          >
            <button
              ref={closeRef}
              type="button"
              className="modal-close"
              onClick={close}
              aria-label="Close"
            >
              <CloseIcon />
            </button>

            {view === "apply" && role.surveyId ? (
              <div className="modal-body modal-body-apply">
                <button type="button" className="modal-back" onClick={() => showView("details")}>
                  <ArrowIcon size={16} className="rotate-180" />
                  Back to role details
                </button>
                <span className="tag">{role.team}</span>
                <h2 id="role-dialog-title" className="modal-h modal-h-sm">
                  Apply for {role.title}
                </h2>
                <ul className="role-chips" aria-label="Role details">
                  <li className="role-chip-pay">{role.salary}</li>
                  <li>{EMPLOYMENT}</li>
                  <li>{LOCATION}</li>
                </ul>
                <div className="modal-apply">
                  <ApplyForm role={role} />
                </div>
              </div>
            ) : (
              <>
                <div className="modal-img">
                  <Image src={roleImage(role)} alt="" fill sizes="(min-width: 1080px) 1040px, 100vw" />
                </div>

                <div className="modal-body">
                  <span className="tag">{role.team}</span>
                  <div className="flex flex-col gap-2">
                    <h2 id="role-dialog-title" className="modal-h">
                      {role.title}
                    </h2>
                    <p className="text-[15px] text-muted">{role.experience}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <ul className="role-chips" aria-label="Role details">
                      <li className="role-chip-pay">{role.salary}</li>
                      <li>{EMPLOYMENT}</li>
                      <li>{LOCATION}</li>
                    </ul>
                    {role.surveyId && applyButton}
                  </div>

                  <p className="modal-lead">{role.about}</p>

                  <div className="modal-cols">
                    <div className="modal-sec">
                      <h3>What you&apos;ll do</h3>
                      <ul>
                        {role.duties.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="modal-sec">
                      <h3>What we&apos;re looking for</h3>
                      <ul>
                        {role.requirements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="modal-sec">
                    <h3>What you&apos;ll get</h3>
                    <ul>
                      {PERKS.map((perk) => (
                        <li key={perk.title}>{perk.title}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-cta">
                    {role.surveyId ? (
                      <>
                        <div className="flex flex-col gap-1">
                          <p className="modal-cta-h">Sounds like you?</p>
                          <p className="text-sm text-muted">
                            We review every application personally.
                          </p>
                        </div>
                        {applyButton}
                      </>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <p className="modal-cta-h">Applications for this role open soon.</p>
                        <p className="text-sm text-muted">
                          The application form will appear here once it&apos;s ready.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
