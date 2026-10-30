import { FooterBase } from "@/components/footer-base";
import { ArrowIcon } from "@/components/icons";
import { EMAIL } from "@/lib/contact";

const OPEN_APPLICATION = `mailto:${EMAIL}?subject=${encodeURIComponent("Open application")}`;

// Dark footer for the careers pages: an open invitation, then the wordmark.
export function CareersEnd() {
  return (
    <footer className="end">
      <div className="mx-auto max-w-[1376px]">
        <div className="reveal flex flex-col gap-7">
          <span className="tag">Don&apos;t see your role?</span>
          <h2 className="end-h">
            Send us <span className="grad-text">your best work.</span>
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={OPEN_APPLICATION} className="btn btn-paper" data-magnetic>
              <span className="roll" data-t="Email your portfolio">
                <span>Email your portfolio</span>
              </span>
              <span className="btn-dot">
                <ArrowIcon />
              </span>
            </a>
            <span className="text-[15px] text-muted-dark">{EMAIL}</span>
          </div>
        </div>
        <FooterBase />
      </div>
    </footer>
  );
}
