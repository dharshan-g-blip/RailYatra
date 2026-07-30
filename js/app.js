/* =========================================================================
   app.js — entry point.
   Owns the top-level render() (panel switching between the three tabs)
   and registers it with renderer.js so every UC module can trigger a
   redraw without a circular import back to this file.
========================================================================= */

import { state } from "./state.js";
import { setRender } from "./renderer.js";
import { renderBookPanel } from "./bookingFlow.js";
import { renderStatusPanel } from "./uc7-pnrStatus.js";
import { renderHistoryPanel } from "./uc9-history.js";

function render(){
  document.querySelectorAll("nav.tabs button").forEach(b =>
    b.classList.toggle("active", b.dataset.screen === state.screen)
  );
  document.getElementById("panel-book").classList.toggle("active", state.screen === "book");
  document.getElementById("panel-status").classList.toggle("active", state.screen === "status");
  document.getElementById("panel-history").classList.toggle("active", state.screen === "history");

  if(state.screen === "book") renderBookPanel();
  if(state.screen === "status") renderStatusPanel();
  if(state.screen === "history") renderHistoryPanel();
}

setRender(render);

document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-screen]");
  if(!btn) return;
  state.screen = btn.dataset.screen;
  render();
});

render(); // initial paint
