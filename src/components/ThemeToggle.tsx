"use client";

import { iconButtonBase } from "./IconButton";
import Icon from "./icons";

export const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
  } catch (e) {}
})();
`;

export default function ThemeToggle() {
  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={`${iconButtonBase} w-10 h-10`}
    >
      <Icon id="sun" className="theme-icon-dark" size={17} />
      <Icon id="moon" className="theme-icon-light" size={17} />
    </button>
  );
}
