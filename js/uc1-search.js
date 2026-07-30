/* =========================================================================
   uc1-search.js — Use Case 1: Search Trains
   Passenger enters source, destination and date. System validates the
   input (business rule: source != destination; exception: unrecognized
   station) and searches TRAINS for matches.
========================================================================= */

import { state } from "./state.js";
import { TRAINS, STATIONS, ROUTES } from "./data.js";
import { escapeHtml, todayISO, bannerHtml } from "./utils.js";
import { render } from "./renderer.js";

export function tplSearch(){
  const c = state.searchCriteria || {};
  return `
  <div class="card">
    <h2>Search Trains</h2>
    <p class="subtext">Enter source, destination and date of journey.</p>
    <div id="search-error"></div>
    <div class="field-grid">
      <div class="field"><label>Source Station</label>
        <input list="station-list" id="src-input" value="${escapeHtml(c.source||"")}" placeholder="e.g. Chennai Central">
      </div>
      <div class="field"><label>Destination Station</label>
        <input list="station-list" id="dst-input" value="${escapeHtml(c.destination||"")}" placeholder="e.g. KSR Bengaluru">
      </div>
    </div>
    <div class="field" style="max-width:220px;">
      <label>Date of Journey</label>
      <input type="date" id="date-input" min="${todayISO()}" value="${c.date||todayISO()}">
    </div>
    <datalist id="station-list">${STATIONS.map(s=>`<option value="${escapeHtml(s)}">`).join("")}</datalist>
    <div class="btn-row"><button class="btn btn-primary" id="search-btn">Search Trains</button></div>
    <div class="route-chips">
      <span class="subtext" style="margin-right:6px;">Popular routes:</span>
      ${ROUTES.map(r => `<button type="button" class="chip route-chip" data-source="${escapeHtml(r.source)}" data-destination="${escapeHtml(r.destination)}">${escapeHtml(r.source)} → ${escapeHtml(r.destination)}</button>`).join("")}
    </div>
  </div>`;
}

function doSearch(){
  const source = document.getElementById("src-input").value.trim();
  const destination = document.getElementById("dst-input").value.trim();
  const date = document.getElementById("date-input").value;
  const errBox = document.getElementById("search-error");
  errBox.innerHTML = "";

  // Business rule: source and destination must not be the same
  if(source && destination && source.toLowerCase() === destination.toLowerCase()){
    errBox.innerHTML = bannerHtml("err","Source and destination cannot be the same station.");
    return;
  }
  // Exception: invalid / unrecognized station name
  const validSource = STATIONS.find(s => s.toLowerCase() === source.toLowerCase());
  const validDest = STATIONS.find(s => s.toLowerCase() === destination.toLowerCase());
  if(!source || !validSource){
    errBox.innerHTML = bannerHtml("err", `Station "${escapeHtml(source||"")}" was not recognized. Pick one from the suggestions.`);
    return;
  }
  if(!destination || !validDest){
    errBox.innerHTML = bannerHtml("err", `Station "${escapeHtml(destination||"")}" was not recognized. Pick one from the suggestions.`);
    return;
  }
  if(!date){
    errBox.innerHTML = bannerHtml("err","Please choose a date of journey.");
    return;
  }

  runSearchFor(validSource, validDest, date);
}

// Shared by the search button and every "route chip" (popular routes on
// the search form, suggestions on the no-results screen) so they all go
// through the same known-valid station matching instead of re-reading
// form inputs that may not exist on the current screen.
export function runSearchFor(source, destination, date){
  const results = TRAINS.filter(t => t.source === source && t.destination === destination);
  state.searchCriteria = { source, destination, date: date || todayISO() };
  state.searchResults = results;
  state.bookStep = 2;
  render();
}

export function bindSearchEvents(){
  const btn = document.getElementById("search-btn");
  if(btn) btn.addEventListener("click", doSearch);

  document.querySelectorAll(".route-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      runSearchFor(chip.dataset.source, chip.dataset.destination, document.getElementById("date-input").value);
    });
  });
}
