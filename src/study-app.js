import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";
import { loadLogs, saveLogs, clearLogs } from "./study-store.js";

function nowISO() {
  return new Date().toISOString();
}

function fmt(dateStr) {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));
  } catch {
    return dateStr || "";
  }
}

function makeId() {
  return crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());
}

function App() {
  const [logs, setLogs] = React.useState(() => loadLogs());
  const [editingId, setEditingId] = React.useState(null);

  // form
  const [category, setCategory] = React.useState("coding");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  // filter/search/sort
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("desc");

  // localStorage sync (state → storage)
  React.useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  const categories = React.useMemo(() => {
    const set = new Set(logs.map((l) => l.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [logs]);

  const shown = React.useMemo(() => {
    let list = [...logs];

    if (categoryFilter !== "all") {
      list = list.filter((l) => l.category === categoryFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((l) => {
        const t = (l.title || "").toLowerCase();
        const c = (l.content || "").toLowerCase();
        return t.includes(q) || c.includes(q);
      });
    }

    list.sort((a, b) => {
      const da = new Date(a.date || 0).getTime();
      const db = new Date(b.date || 0).getTime();
      return sortOrder === "asc" ? da - db : db - da;
    });

    return list;
  }, [logs, categoryFilter, search, sortOrder]);

  function resetForm() {
    setEditingId(null);
    setCategory("coding");
    setTitle("");
    setContent("");
  }

  function startEdit(log) {
    setEditingId(log.id);
    setCategory(log.category || "coding");
    setTitle(log.title || "");
    setContent(log.content || "");
  }

  function onSubmit(e) {
    e.preventDefault();

    const t = title.trim();
    const c = content.trim();
    if (!t && !c) {
      alert("제목 또는 내용을 입력해줘.");
      return;
    }

    if (editingId) {
      setLogs((prev) =>
        prev.map((x) =>
          x.id === editingId ? { ...x, category, title: t, content: c } : x
        )
      );
      resetForm();
      return;
    }

    const newLog = {
      id: makeId(),
      category,
      title: t,
      content: c,
      date: nowISO(),
    };
    setLogs((prev) => [newLog, ...prev]);
    resetForm();
  }

  function onDelete(id) {
    if (!confirm("삭제할까?")) return;
    setLogs((prev) => prev.filter((x) => x.id !== id));
    if (editingId === id) resetForm();
  }

  function onClearAll() {
    if (!confirm("전체 삭제할까? (localStorage 포함)")) return;
    clearLogs();
    setLogs([]);
    resetForm();
  }

  return React.createElement(
    "div",
    { className: "space-y-4" },

    // top bar
    React.createElement(
      "div",
      { className: "rounded-3xl border border-white/10 bg-white/5 p-4" },
      React.createElement(
        "div",
        { className: "flex flex-wrap items-center justify-between gap-3" },
        React.createElement(
          "div",
          { className: "text-sm text-slate-200/90" },
          `표시: ${shown.length} / 전체: ${logs.length}`
        ),
        React.createElement(
          "div",
          { className: "flex gap-2" },
          React.createElement(
            "button",
            {
              className:
                "rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10",
              onClick: () => setLogs(loadLogs()),
              title: "localStorage에서 다시 불러오기",
            },
            "Reload"
          ),
          React.createElement(
            "button",
            {
              className:
                "rounded-2xl border border-red-400/30 bg-red-500/15 px-3 py-2 text-sm font-semibold hover:bg-red-500/25",
              onClick: onClearAll,
            },
            "Clear All"
          )
        )
      )
    ),

    // grid
    React.createElement(
      "div",
      { className: "grid gap-4 lg:grid-cols-2" },

      // form
      React.createElement(
        "section",
        { className: "rounded-3xl border border-white/10 bg-white/5 p-5" },
        React.createElement(
          "h2",
          { className: "text-lg font-semibold" },
          editingId ? "Edit Log" : "Add Log"
        ),
        React.createElement(
          "form",
          { className: "mt-4 space-y-3", onSubmit },
          React.createElement(
            "div",
            { className: "grid gap-2 sm:grid-cols-2" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "label",
                { className: "text-xs text-slate-300/80" },
                "Category"
              ),
              React.createElement(
                "select",
                {
                  className:
                    "mt-1 w-full rounded-2xl border border-white/15 bg-black/20 p-2 text-sm outline-none focus:border-white/30",
                  value: category,
                  onChange: (e) => setCategory(e.target.value),
                },
                React.createElement("option", { value: "coding" }, "coding"),
                React.createElement(
                  "option",
                  { value: "japanese" },
                  "japanese"
                ),
                React.createElement("option", { value: "life" }, "life"),
                React.createElement("option", { value: "finance" }, "finance")
              )
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "label",
                { className: "text-xs text-slate-300/80" },
                "Sort"
              ),
              React.createElement(
                "select",
                {
                  className:
                    "mt-1 w-full rounded-2xl border border-white/15 bg-black/20 p-2 text-sm outline-none focus:border-white/30",
                  value: sortOrder,
                  onChange: (e) => setSortOrder(e.target.value),
                },
                React.createElement("option", { value: "desc" }, "Newest"),
                React.createElement("option", { value: "asc" }, "Oldest")
              )
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "text-xs text-slate-300/80" },
              "Title"
            ),
            React.createElement("input", {
              className:
                "mt-1 w-full rounded-2xl border border-white/15 bg-black/20 p-3 text-sm outline-none focus:border-white/30",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "제목",
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "text-xs text-slate-300/80" },
              "Content"
            ),
            React.createElement("textarea", {
              className:
                "mt-1 w-full resize-y rounded-2xl border border-white/15 bg-black/20 p-3 text-sm outline-none focus:border-white/30",
              value: content,
              onChange: (e) => setContent(e.target.value),
              rows: 6,
              placeholder: "내용",
            })
          ),
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
              editingId ? "Update" : "Add"
            ),
            React.createElement(
              "button",
              {
                className:
                  "rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10",
                type: "button",
                onClick: resetForm,
              },
              "Reset"
            )
          )
        )
      ),

      // filter/search
      React.createElement(
        "section",
        { className: "rounded-3xl border border-white/10 bg-white/5 p-5" },
        React.createElement(
          "h2",
          { className: "text-lg font-semibold" },
          "Filter / Search"
        ),
        React.createElement(
          "div",
          { className: "mt-4 space-y-3" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "text-xs text-slate-300/80" },
              "Category Filter"
            ),
            React.createElement(
              "select",
              {
                className:
                  "mt-1 w-full rounded-2xl border border-white/15 bg-black/20 p-2 text-sm outline-none focus:border-white/30",
                value: categoryFilter,
                onChange: (e) => setCategoryFilter(e.target.value),
              },
              categories.map((c) =>
                React.createElement("option", { key: c, value: c }, c)
              )
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "label",
              { className: "text-xs text-slate-300/80" },
              "Search (title/content)"
            ),
            React.createElement("input", {
              className:
                "mt-1 w-full rounded-2xl border border-white/15 bg-black/20 p-3 text-sm outline-none focus:border-white/30",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "검색어",
            })
          )
        )
      )
    ),

    // list
    React.createElement(
      "section",
      { className: "rounded-3xl border border-white/10 bg-white/5 p-5" },
      React.createElement("h2", { className: "text-lg font-semibold" }, "Logs"),
      shown.length === 0
        ? React.createElement(
            "p",
            { className: "mt-4 text-sm text-slate-300/70" },
            "표시할 로그가 없습니다."
          )
        : React.createElement(
            "ul",
            { className: "mt-4 space-y-3" },
            shown.map((log) =>
              React.createElement(
                "li",
                {
                  key: log.id,
                  className:
                    "rounded-3xl border border-white/10 bg-black/20 p-4",
                },
                React.createElement(
                  "div",
                  { className: "flex items-start justify-between gap-3" },
                  React.createElement(
                    "div",
                    { className: "min-w-0" },
                    React.createElement(
                      "div",
                      { className: "flex flex-wrap items-center gap-2" },
                      React.createElement(
                        "span",
                        {
                          className:
                            "rounded-full bg-white/10 px-2 py-1 text-[11px] text-slate-200/70",
                        },
                        log.category || "uncategorized"
                      ),
                      React.createElement(
                        "span",
                        { className: "text-xs text-slate-300/60" },
                        fmt(log.date)
                      )
                    ),
                    React.createElement(
                      "h3",
                      { className: "mt-2 font-semibold" },
                      log.title || "(no title)"
                    ),
                    React.createElement(
                      "p",
                      {
                        className:
                          "mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-200/90",
                      },
                      log.content || ""
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "flex shrink-0 gap-2" },
                    React.createElement(
                      "button",
                      {
                        className:
                          "rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/10",
                        onClick: () => startEdit(log),
                      },
                      "Edit"
                    ),
                    React.createElement(
                      "button",
                      {
                        className:
                          "rounded-2xl border border-red-400/30 bg-red-500/15 px-3 py-2 text-sm font-semibold hover:bg-red-500/25",
                        onClick: () => onDelete(log.id),
                      },
                      "Delete"
                    )
                  )
                )
              )
            )
          )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App)
);
