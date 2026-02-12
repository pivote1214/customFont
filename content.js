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
    // Notion固有: notion-クラスを持つ要素とその子孫のみ対象(他サイトには影響しない)
    '[class*="notion-"]',
    '[class*="notion-"] *',
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
  }

  styleElement.textContent = buildCss();
  // 常に<head>末尾に配置し、カスケード優先度を最大化
  root.appendChild(styleElement);
}

function ensureStylePriority() {
  const root = document.head || document.documentElement;
  if (!root) return;

  const styleElement = document.getElementById(STYLE_ID);
  if (!styleElement) {
    injectOrUpdateStyle();
    return;
  }

  // <head>の末尾でなければ移動
  if (styleElement !== root.lastElementChild) {
    root.appendChild(styleElement);
  }
}

function startObserver() {
  const target = document.head || document.documentElement;
  if (!target) return;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        ensureStylePriority();
        return;
      }
    }
  });

  observer.observe(target, { childList: true });
}

injectOrUpdateStyle();
startObserver();
