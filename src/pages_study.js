import React from "https://esm.sh/react@18";
import { addItem, loadItems, removeItem } from "./store.js";

function formatKST(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso;
  }
}

export function StudyPage() {
  const [text, setText] = React.useState("");
  const [items, setItems] = React.useState(() => loadItems());

  function onSubmit(e) {
    e.preventDefault();
    setItems((prev) => addItem(prev, text));
    setText("");
  }

  function onRemove(id) {
    setItems((prev) => removeItem(prev, id));
  }

  return React.createElement(
    "div",
    { className: "grid gap-4 lg:grid-cols-2" },

    // Left: editor
    React.createElement(
      "section",
      {
        className:
          "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20",
      },
      React.createElement(
        "h2",
        { className: "text-lg font-semibold" },
        "Study Log"
      ),
      React.createElement(
        "p",
        { className: "mt-2 leading-7 text-slate-200/90" },
        "무빌드 방식에서는 경로/확장자/모듈 import가 엄격합니다. 기록하면서 익숙해져요."
      ),
      React.createElement(
        "form",
        { className: "mt-3 space-y-3", onSubmit },
        React.createElement("textarea", {
          className:
            "w-full resize-y rounded-2xl border border-white/15 bg-black/20 p-3 text-slate-100 outline-none focus:border-white/30",
          value: text,
          onChange: (e) => setText(e.target.value),
          placeholder: "오늘 배운 것 / 막힌 것 / 깨달은 것…",
          rows: 4,
        }),
        React.createElement(
          "div",
          { className: "flex gap-2" },
          React.createElement(
            "button",
            {
              className:
                "rounded-2xl border border-blue-400/30 bg-blue-500/20 px-4 py-2 text-sm font-semibold hover:bg-blue-500/30",
              type: "submit",
            },
            "Add"
          ),
          React.createElement(
            "button",
            {
              className:
                "rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10",
              type: "button",
              onClick: () => setText(""),
            },
            "Clear"
          )
        )
      )
    ),

    // Right: list
    React.createElement(
      "section",
      {
        className:
          "rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20",
      },
      React.createElement(
        "div",
        { className: "flex items-center justify-between gap-3" },
        React.createElement(
          "h3",
          { className: "text-sm font-semibold text-slate-200/90" },
          `Items (${items.length})`
        ),
        React.createElement(
          "span",
          {
            className:
              "rounded-full bg-white/10 px-2 py-1 text-[11px] text-slate-200/70",
          },
          "Saved in localStorage"
        )
      ),

      items.length === 0
        ? React.createElement(
            "p",
            { className: "mt-4 text-sm text-slate-300/70" },
            "아직 기록이 없어요. 하나 추가해보자."
          )
        : React.createElement(
            "ul",
            { className: "mt-4 space-y-3" },
            items.map((it) =>
              React.createElement(
                "li",
                {
                  key: it.id,
                  className:
                    "flex items-start justify-between gap-3 rounded-3xl border border-white/10 bg-black/20 p-4",
                },
                React.createElement(
                  "div",
                  { className: "min-w-0" },
                  React.createElement(
                    "div",
                    { className: "whitespace-pre-wrap leading-6" },
                    it.text
                  ),
                  React.createElement(
                    "div",
                    { className: "mt-2 text-xs text-slate-300/60" },
                    formatKST(it.createdAt)
                  )
                ),
                React.createElement(
                  "button",
                  {
                    className:
                      "shrink-0 rounded-2xl border border-red-400/30 bg-red-500/15 px-3 py-2 text-sm font-semibold hover:bg-red-500/25",
                    onClick: () => onRemove(it.id),
                  },
                  "Delete"
                )
              )
            )
          )
    )
  );
}
