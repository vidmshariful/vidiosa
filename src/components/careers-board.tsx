"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ApplyForm } from "@/components/apply-form";
import { ArrowIcon, CloseIcon } from "@/components/icons";
import {
  getRole,
  LOCATION,
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const applyRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const role = openSlug ? getRole(openSlug) : undefined;
  const shown = filter === "All" ? ROLES : ROLES.filter((r) => r.team === filter);

  const open = (slug: string) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setClosing(false);
    setOpenSlug(slug);
    window.history.replaceState(null, "", `?role=${slug}`);
  };

  const close = useCallback(() => {
    setClosing(true);
    window.history.replaceState(null, "", window.location.pathname);
    window.setTimeout(() => {
      setOpenSlug(null);
      setClosing(false);
      returnFocus.current?.focus();
    }, CLOSE_MS);
  }, []);

  // A shared link (/careers?role=<slug>) opens that role on arrival.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("role");
    if (!slug || !getRole(slug)) return;
    const id = requestAnimationFrame(() => setOpenSlug(slug));
    return () => cancelAnimationFrame(id);
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
                <span className="job-sum">{r.summary}</span>
                <span className="job-focus">{r.focus}</span>
              </span>
              <span className="job-foot">
                <span>
                  View role and apply
                  <span className="job-loc">{LOCATION}</span>
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

            <div className="modal-img">
              <Image src={roleImage(role)} alt="" fill sizes="(min-width: 800px) 760px, 100vw" />
            </div>

            <div className="modal-body">
              <span className="tag">{role.team}</span>
              <h2 id="role-dialog-title" className="modal-h">
                {role.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <ul className="role-chips" aria-label="Role details">
                  <li>{LOCATION}</li>
                  <li>{role.team}</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-ink btn-sm"
                  onClick={() =>
                    applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  <span className="roll" data-t="Apply now">
                    <span>Apply now</span>
                  </span>
                  <span className="btn-dot">
                    <ArrowIcon size={16} className="rotate-90" />
                  </span>
                </button>
              </div>

              <p className="modal-lead">{role.summary}</p>

              <div className="modal-sec">
                <h3>You&apos;ll work on</h3>
                <p>{role.focus}</p>
              </div>

              {role.details?.map((section) => (
                <div key={section.heading} className="modal-sec">
                  <h3>{section.heading}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div ref={applyRef} className="modal-apply">
                <h3>Apply for this role</h3>
                <ApplyForm role={role} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
