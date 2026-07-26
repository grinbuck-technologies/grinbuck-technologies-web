export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const Z_NAV = 10;

// Centered fixed-width content column — the standard pattern for a
// readable column with breathing room on wide monitors. Applied via
// maxWidth + margin: "0 auto" on each section's inner content wrapper.
export const SECTION_MAX_WIDTH = "1100px";

// Horizontal gutter used alongside SECTION_MAX_WIDTH above, so the column
// still has safe padding on small/medium screens (where it exceeds the
// column width and the cap doesn't yet apply).
export const SECTION_PADDING_X = "clamp(2rem, 6vw, 8rem)";

export const CONTACT_EMAIL = "hello@grinbuck.com";
export const SITE_LEGAL_NAME = "Grinbuck Technologies Inc.";

// Nav dimensions
export const NAV_HEIGHT = 60; // px — sticky header height
export const NAV_SCROLL_OFFSET = 80; // px — NAV_HEIGHT + 20px breathing room; shared by Lenis offset and scrollMarginTop
export const NAV_SHADOW_THRESHOLD = 8; // px scrollY at which nav shadow appears

// Scroll
export const SCROLL_DURATION = 1.2; // seconds, Lenis scrollTo duration

// Animation
export const ANIM_DURATION_ENTER = 1; // seconds — hero mount
export const ANIM_DURATION_REVEAL = 0.85; // seconds — scroll reveal
export const ANIM_STAGGER = 0.18; // seconds — between staggered hero elements
export const ANIM_DELAY_ENTER = 0.2; // seconds — initial delay before hero plays
export const ANIM_Y_HERO = 24; // px — initial y offset for hero elements
export const ANIM_Y_REVEAL = 36; // px — initial y offset for scroll-reveal elements
