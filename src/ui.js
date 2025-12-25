import React from "https://esm.sh/react@18";
import { navigate } from "./router.js";

export function AppShell(props) {
  return React.createElement(
    "div",
    { className: "mx-auto max-w-5xl p-6" },

    // Header
    React.createElement(
      "header",
      { className: "mb-6 space-y-4" },

      React.createElement(
        "div",
        { className: "flex items-center gap-3" },
        React.createElement(
          "div",
          {
            className:
              "flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 font-bold tracking-wide",
          },
          "JP"
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            { className: "m-0 text-xl font-semibold" },
            "Dev Study Log"
          ),
          React.createElement(
            "p",
            { className: "mt-1 text-sm text-slate-300/80" },
            "No-build React (CDN + ESM + createElement) + Tailwind CDN"
          )
        )
      ),

      React.createElement(
        "nav",
        { className: "flex gap-2" },
        React.createElement(
          "button",
          {
            className:
              "rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10",
            onClick: () => navigate("/"),
          },
          "Home"
        ),
        React.createElement(
          "button",
          {
            className:
              "rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10",
            onClick: () => navigate("/study"),
          },
          "Study"
        )
      )
    ),

    // Main
    React.createElement("main", null, props.children),

    // Footer
    React.createElement(
      "footer",
      { className: "mt-8 text-xs text-slate-400/70" },
      "© ",
      new Date().getFullYear(),
      " — No build. No JSX. Just browser modules."
    )
  );
}
