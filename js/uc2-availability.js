import { state } from "./state.js";
import { CLASS_LABELS, ROUTES } from "./data.js";
import { escapeHtml, formatINR } from "./utils.js";
import { render } from "./renderer.js";
import { runSearchFor } from "./uc1-search.js";

export function tplResults(){
  const c = state.searchCriteria;
  if(state.searchResults.length === 0){
    const fromHere = ROUTES.filter(r => r.source === c.source);
    const suggestions = (fromHere.length ? fromHere : ROUTES).slice(0, 5);
    return `
    <div class="card">
      <div class="empty-state">
        <div class="icon">🚉</div>
        <h3>No trains found</h3>
        <p class="subtext">No trains run from ${escapeHtml(c.source)} to ${escapeHtml(c.destination)} in our schedule.</p>
        <div class="route-chips" style="justify-content:center;">
          <span class="subtext" style="margin-right:6px;">${fromHere.length ? `Try instead:` : `Routes we do have:`}</span>
          ${suggestions.map(r => `<button type="button" class="chip route-chip" data-source="${escapeHtml(r.source)}" data-destination="${escapeHtml(r.destination)}">${escapeHtml(r.source)} → ${escapeHtml(r.destination)}</button>`).join("")}
        </div>
        <button class="btn btn-ghost" id="back-to-search">Search Again</button>
      </div>
    </div>`;
  }

  const rows = state.searchResults.map(t => `
    <div class="train-row">
      <div class="train-row-top">
        <div><span class="train-num mono">${t.number}</span><span class="train-name">${t.name}</span></div>
        <div class="train-times">${t.depart} → ${t.arrive} · ${t.duration}</div>
      </div>
      <div class="class-grid">
        ${Object.keys(t.classes).map(cls => classBox(t, cls)).join("")}
      </div>
    </div>
  `).join("");

  return `
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:6px;">
      <h2>${escapeHtml(c.source)} → ${escapeHtml(c.destination)}</h2>
      <button class="btn btn-ghost btn-sm" id="back-to-search">Modify Search</button>
    </div>
    <p class="subtext">${state.searchResults.length} train(s) found for ${c.date}. Availability shown reflects current booking data.</p>
    ${rows}
  </div>`;
}

// Renders the availability status + fare for one class, with the button
// that Use Case 3 (uc3-selectClass.js) wires up via the .select-class-btn
// class and data-train / data-class attributes.
export function classBox(train, cls){
  const info = train.classes[cls];
  const available = info.total - info.booked;
  const isAvailable = available > 0;
  const wlNumber = 3 + (train.number.charCodeAt(0) % 15); // deterministic mock waitlist number
  return `
  <div class="class-box">
    <div class="cname">${cls} · ${CLASS_LABELS[cls]}</div>
    <div class="cstatus ${isAvailable ? "avail":"wl"}">${isAvailable ? `Available (${available})` : `Waitlisted WL${wlNumber}`}</div>
    <div class="fare">${formatINR(train.fare[cls])} / passenger</div>
    <button class="btn btn-accent btn-sm select-class-btn" data-train="${train.number}" data-class="${cls}" ${isAvailable ? "" : "disabled"} style="width:100%;">
      ${isAvailable ? "Select" : "Join Waitlist"}
    </button>
  </div>`;
}

export function bindAvailabilityEvents(){
  const backBtn = document.getElementById("back-to-search");
  if(backBtn) backBtn.addEventListener("click", () => { state.bookStep = 1; render(); });

  document.querySelectorAll(".route-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      runSearchFor(chip.dataset.source, chip.dataset.destination, state.searchCriteria?.date);
    });
  });
}
