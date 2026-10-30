import Script from "next/script";

import { BOOKING_EMBED_SCRIPT, BOOKING_WIDGET_URL } from "@/lib/contact";

export function BookingCalendar() {
  return (
    <div id="book" className="booking">
      <iframe
        // The embed script matches booking iframes by src and keys resizing off this id.
        id="HEKYvWPJ2fQkDzMqsZtI_1793359301034"
        src={BOOKING_WIDGET_URL}
        title="Book a free 30 minute call with Vidiosa"
        allow="payment"
        scrolling="no"
      />
      <Script src={BOOKING_EMBED_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}
