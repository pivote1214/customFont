// Get user-specified font settings from storage or use default values
const defaultFontFamily = "Noto Sans JP";
const monospaceFontFamily = "Monaco, Menlo";
const mathFontFamily = "Tex Gyre PagellaX";

// List of blocked domains
const blockedDomains = [
  "colab.research.google.com", 
  "caledar.google.com", 
];

// List of notion domains
const notionDomains = [
  "notion.so"
];

// List of special domains
const specialDomains = [
  "drive.google.com", 
  "ticktick.com", 
  "teams.microsoft.com", 
];

// Check if the current domain is in the blockedDomains list
const isBlockedSite = blockedDomains.some(domain => document.location.hostname.includes(domain));
const isNotionSite = notionDomains.some(domain => document.location.hostname.includes(domain));
const isSpecialSite = specialDomains.some(domain => document.location.hostname.includes(domain));

// supecialDomains
if (isSpecialSite) {
  const styleElement = document.createElement("style");
  styleElement.id = "custom-font-override";
  document.head.appendChild(styleElement);

  styleElement.textContent = `
    body * {
      font-family: ${defaultFontFamily} !important;
    }
  `;
}
else if (isNotionSite) {
  const styleElement = document.createElement("style");
  styleElement.id = "custom-font-override";
  document.head.appendChild(styleElement);

  styleElement.textContent = `
    span.katex-html * {
      font-family: ${mathFontFamily} !important;
    }
    div.notion-selectable.notion-code-block * {
      font-family: ${monospaceFontFamily} ! important;
    }
    body, * {
      font-family: ${defaultFontFamily} !important;
    }
  `;
}
// If the current domain is not in the blockedDomains list, apply the custom font settings
else if (!isBlockedSite) {
  const styleElement = document.createElement("style");
  styleElement.id = "custom-font-override";
  document.head.appendChild(styleElement);

  styleElement.textContent = `
    body, p, h1, h2, h3, h4, h5, h6, textarea, select {
      font-family: ${defaultFontFamily} !important;
    }
    pre, code, code * {
      font-family: ${monospaceFontFamily} !important;
    }
  `;
}
