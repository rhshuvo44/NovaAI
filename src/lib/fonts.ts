import localFont from "next/font/local";

/**
 * Fraunces - display serif.
 * Used for headlines, hero copy, and the brand mark. Carries the
 * "considered, editorial" personality of the product. Used sparingly,
 * never for body copy or UI chrome.
 */
export const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/fraunces-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/fraunces-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/fraunces-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/fraunces-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/fraunces-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

/**
 * Inter - UI and body text.
 * The workhorse face: navigation, body copy, form labels, buttons.
 */
export const inter = localFont({
  src: [
    { path: "../fonts/inter-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

/**
 * JetBrains Mono - code, AI output, data, and numeric tables.
 * Treated as a first-class face since the product renders AI-generated
 * code and structured data constantly, not just as an incidental code block face.
 */
export const jetbrainsMono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/jetbrains-mono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});
