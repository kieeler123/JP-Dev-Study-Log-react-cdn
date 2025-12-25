import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";

import { AppShell } from "./ui.js";
import { RouterView, initRouter } from "./router.js";

function App() {
  return React.createElement(
    AppShell,
    null,
    React.createElement(RouterView, null)
  );
}

initRouter();

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(App)
);
