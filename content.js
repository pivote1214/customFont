// Get user-specified font settings from storage or use default values
const defaultFontFamily = "Noto Sans JP";
const monospaceFontFamily = "Monaco, monospace";

// List of blocked domains
const blockedDomains = [
  "colab.research.google.com", 
];

// List of special domains
const specialDomains = [
  "notion.so", 
  "ticktick.com", 
  "teams.microsoft.com", 
];

// Check if the current domain is in the blockedDomains list
const isBlockedSite = blockedDomains.some(domain => document.location.hostname.includes(domain));
const isSpecialSite = specialDomains.some(domain => document.location.hostname.includes(domain));

// supecialDomainsの特殊設定
if (isSpecialSite) {
  const styleElement = document.createElement("style");
  styleElement.id = "custom-font-override";
  document.head.appendChild(styleElement);

  styleElement.textContent = `
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
