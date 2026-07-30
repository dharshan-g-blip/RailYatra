/* =========================================================================
   state.js — the single shared state object.
   Every module imports `state` and mutates it directly, then calls
   render() (from renderer.js) to redraw. Simple, framework-free
   alternative to something like React's useState.
========================================================================= */

export const state = {
  screen: "book",         // "book" | "status" | "history"
  bookStep: 1,             // 1 search, 2 results, 3 passengers, 4 payment, 5 confirmation
  searchCriteria: null,
  searchResults: [],
  selectedTrain: null,
  selectedClass: null,
  passengers: [],
  fareTotal: 0,
  paymentMethod: "upi",
  lastBooking: null
};

export function blankPassenger(){
  return { name:"", age:"", gender:"", berth:"" };
}

export function resetBookingFlow(){
  state.bookStep = 1;
  state.selectedTrain = null;
  state.selectedClass = null;
  state.passengers = [ blankPassenger() ];
  state.lastBooking = null;
}

// initialise with one blank passenger row
state.passengers = [ blankPassenger() ];
