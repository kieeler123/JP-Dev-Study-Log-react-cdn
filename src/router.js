import React from "https://esm.sh/react@18";

import { HomePage } from "./pages_home.js";
import { StudyPage } from "./pages_study.js";
import { NotFoundPage } from "./pages_notfound.js";

let _setRoute = null;

function parseHash() {
  // #/study 같은 형태
  const hash = location.hash || "#/";
  const path = hash.startsWith("#") ? hash.slice(1) : hash;
  return path || "/";
}

function resolveComponent(path) {
  if (path === "/" || path === "") return HomePage;
  if (path === "/study") return StudyPage;
  return NotFoundPage;
}

export function navigate(path) {
  location.hash = `#${path}`;
}

export function initRouter() {
  window.addEventListener("hashchange", () => {
    if (_setRoute) _setRoute(parseHash());
  });
}

export function RouterView() {
  const [route, setRoute] = React.useState(parseHash());
  _setRoute = setRoute;

  const Page = resolveComponent(route);
  return React.createElement(Page, { route });
}
