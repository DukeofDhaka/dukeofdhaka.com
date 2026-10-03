import type { MouseEvent } from "react";
import { site } from "@/lib/content";

/** Compose links with the address (and a subject) prefilled. */
export function composeLinks(email = site.email, subject = site.emailSubject) {
  const to = encodeURIComponent(email);
  const su = encodeURIComponent(subject);
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}`,
    outlook: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${su}`,
    app: `mailto:${email}?subject=${su}`,
  };
}

const EVENT = "open-email-dialog";

/** Open the email dialog (mounted once in SiteShell). */
export function openEmailDialog() {
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function onOpenEmailDialog(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/**
 * onClick for email anchors: keep `href="mailto:…"` (right-click → copy
 * address, works without JS) but open the dialog on a normal click.
 */
export function handleEmailClick(e: MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  openEmailDialog();
}
