import React from "https://esm.sh/react@18";
import { navigate } from "./router.js";

export function HomePage() {
  return React.createElement(
    "section",
    {
      className:
        "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20",
    },
    React.createElement("h2", { className: "text-lg font-semibold" }, "Home"),
    React.createElement(
      "p",
      { className: "mt-2 leading-7 text-slate-200/90" },
      "이 프로젝트는 빌드툴 없이 브라우저가 모듈을 직접 로드하는 방식입니다."
    ),
    React.createElement(
      "ul",
      { className: "mt-3 list-disc space-y-1 pl-5 text-slate-200/80" },
      React.createElement(
        "li",
        null,
        "React/ReactDOM은 esm.sh에서 ESM으로 import"
      ),
      React.createElement("li", null, "JSX 없이 createElement만 사용"),
      React.createElement("li", null, "라우팅은 hash(#/...) 기반")
    ),
    React.createElement(
      "div",
      { className: "mt-4" },
      React.createElement(
        "button",
        {
          className:
            "rounded-2xl border border-blue-400/30 bg-blue-500/20 px-4 py-2 text-sm font-semibold hover:bg-blue-500/30",
          onClick: () => navigate("/study"),
        },
        "Go to Study →"
      )
    )
  );
}
