/* =========================================================================
   ticketView.js — renders a booking as a ticket-stub card.
   Shared by uc6-generatePnr.js (booking confirmation), uc7-pnrStatus.js
   and uc9-history.js, so the ticket looks identical everywhere it appears.
========================================================================= */

import { escapeHtml, formatINR } from "./utils.js";
import { CLASS_LABELS } from "./data.js";

export function ticketCard(b, opts = {}){
  const showCancel = opts.showCancel && b.status === "Confirmed";
  return `
  <div class="ticket">
    <div class="ticket-main">
      <div class="ticket-row"><span>Train</span><span>${b.trainName} (${b.trainNumber})</span></div>
      <div class="ticket-row"><span>Route</span><span>${escapeHtml(b.source)} → ${escapeHtml(b.destination)}</span></div>
      <div class="ticket-row"><span>Date</span><span>${b.date}</span></div>
      <div class="ticket-row"><span>Class</span><span>${CLASS_LABELS[b.class]}</span></div>
      <div class="ticket-row"><span>Fare Paid</span><span>${formatINR(b.fare)}</span></div>
      <ul class="pax-list">
        ${b.passengers.map((p,i) => `<li>${i+1}. ${escapeHtml(p.name)} · ${p.age}y · ${p.gender} · ${p.berth}</li>`).join("")}
      </ul>
      ${showCancel ? `<div class="btn-row"><button class="btn btn-danger btn-sm cancel-booking-btn" data-pnr="${b.pnr}">Cancel Booking</button></div>` : ""}
    </div>
    <div class="ticket-stub-side">
      <div class="pnr-label">PNR</div>
      <div class="pnr-value">${b.pnr}</div>
      <div class="ticket-status ${b.status}">${b.status}</div>
    </div>
  </div>`;
}
