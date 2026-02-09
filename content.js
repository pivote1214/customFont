const STYLE_ID = "custom-font-override";

const FONT_FAMILIES = {
  default: "Noto Sans JP, sans-serif",
  monospace: "Cascadia Code, monospace",
  math: "STIX Two Math, serif",
};

const SELECTORS = {
  default: [
    "body",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "li",
    "a",
    "button",
    "label",
    "input",
    "textarea",
    "select",
    "blockquote",
    "figcaption",
    "table",
    "th",
    "td",
    "dt",
    "dd",
  ],
  monospace: [
    "pre",
    "code",
    "kbd",
    "samp",
    "tt",
    '[class*="code"]',
    '[class*="Code"]',
    '[class*="monospace"]',
    '[class*="Monospace"]',
  ],
  math: [
    "math",
    "mrow",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "msup",
    "msub",
    "mfrac",
    '[class*="katex"]',
    '[class*="KaTeX"]',
    '[class*="MathJax"]',
    '[class*="mathjax"]',
    "[data-math]",
    '[aria-label*="math"]',
    '[aria-label*="Math"]',
  ],
};

function buildCss() {
  const defaultRule = `${SELECTORS.default.join(", ")} { font-family: ${FONT_FAMILIES.default} !important; }`;
  const monospaceRule = `${SELECTORS.monospace.join(", ")} { font-family: ${FONT_FAMILIES.monospace} !important; }`;
  const mathRule = `${SELECTORS.math.join(", ")} { font-family: ${FONT_FAMILIES.math} !important; }`;

  // Order is important: math > monospace > default.
  return [defaultRule, monospaceRule, mathRule].join("\n");
}

function injectOrUpdateStyle() {
  const root = document.head || document.documentElement;
  if (!root) {
    return;
  }

  let styleElement = document.getElementById(STYLE_ID);
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = STYLE_ID;
    root.appendChild(styleElement);
  }

  styleElement.textContent = buildCss();
}

injectOrUpdateStyle();
