/* =========================================================================
   bookingFlow.js — orchestrates the "Book Ticket" tab.
   Not a use case on its own — it just renders the step indicator and
   dispatches to whichever UC module owns the current step, then wires
   up that step's event handlers. Keeping this separate means each
   uc*.js file only knows about its own screen.
========================================================================= */

import { state } from "./state.js";
import { tplSearch, bindSearchEvents } from "./uc1-search.js";
import { tplResults, bindAvailabilityEvents } from "./uc2-availability.js";
import { bindSelectClassEvents } from "./uc3-selectClass.js";
import { tplPassengers, bindPassengerEvents } from "./uc4-passengers.js";
import { tplPayment, bindPaymentEvents } from "./uc5-payment.js";
import { tplConfirmation, bindConfirmationEvents } from "./uc6-generatePnr.js";

const STEP_LABELS = ["Search","Select","Passengers","Payment","Confirmation"];

function renderStepper(){
  let html = "";
  STEP_LABELS.forEach((label, i) => {
    const n = i+1;
    const cls = n < state.bookStep ? "done" : (n === state.bookStep ? "current" : "");
    html += `<div class="step ${cls}">
      <div class="dot">${n < state.bookStep ? "✓" : n}</div>
      <div class="label">${label}</div>
      ${n < STEP_LABELS.length ? '<div class="line"></div>' : ''}
    </div>`;
  });
  document.getElementById("stepper").innerHTML = html;
}

export function renderBookPanel(){
  renderStepper();
  const el = document.getElementById("book-content");

  if(state.bookStep === 1){ el.innerHTML = tplSearch(); bindSearchEvents(); }
  if(state.bookStep === 2){ el.innerHTML = tplResults(); bindAvailabilityEvents(); bindSelectClassEvents(); }
  if(state.bookStep === 3){ el.innerHTML = tplPassengers(); bindPassengerEvents(); }
  if(state.bookStep === 4){ el.innerHTML = tplPayment(); bindPaymentEvents(); }
  if(state.bookStep === 5){ el.innerHTML = tplConfirmation(); bindConfirmationEvents(); }
}
