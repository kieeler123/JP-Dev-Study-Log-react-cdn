import React from "https://esm.sh/react@18";
import { navigate } from "./router.js";

export function NotFoundPage(props) {
  return React.createElement(
    "section",
    {
      className:
        "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20",
    },
    React.createElement("h2", { className: "text-lg font-semibold" }, "404"),
    React.createElement(
      "p",
      { className: "mt-2 leading-7 text-slate-200/90" },
      "존재하지 않는 경로입니다: ",
      React.createElement(
        "code",
        { className: "rounded-lg bg-white/10 px-2 py-1 text-sm" },
        props.route || ""
      )
    ),
    React.createElement(
      "div",
      { className: "mt-4" },
      React.createElement(
        "button",
        {
          className:
            "rounded-2xl border border-blue-400/30 bg-blue-500/20 px-4 py-2 text-sm font-semibold hover:bg-blue-500/30",
          onClick: () => navigate("/"),
        },
        "Back to Home"
      )
    )
  );
}
