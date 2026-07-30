<<<<<<< HEAD
# RailYatra — Railway Reservation System (Frontend)

Frontend-only implementation of the Railway Reservation System use-case
document (UC1–UC9). Plain HTML/CSS/JS with ES modules — no framework, no
build step.

## Structure

```
index.html              shell page: header, nav, panel containers, modal
css/style.css            all styling
js/
  data.js                 mock trains, stations, fare table
  utils.js                 escapeHtml, formatINR, generatePNR, toast, etc.
  state.js                  shared app state
  renderer.js                lets modules trigger a re-render (avoids circular imports)
  storage.js                  persistence layer (get/save/list/clear bookings)
  ticketView.js                 shared ticket-stub renderer
  modal.js                       shared confirm dialog

  uc1-search.js              Use Case 1 — Search Trains
  uc2-availability.js        Use Case 2 — Check Seat Availability
  uc3-selectClass.js         Use Case 3 — Select Train and Travel Class
  uc4-passengers.js          Use Case 4 — Enter Passenger Details
  uc5-payment.js             Use Case 5 — Make Payment
  uc6-generatePnr.js         Use Case 6 — Generate PNR
  uc7-pnrStatus.js           Use Case 7 — View Booking / PNR Status
  uc8-cancelBooking.js       Use Case 8 — Cancel Booking
  uc9-history.js             Use Case 9 — View Booking History

  bookingFlow.js              orchestrates the UC1–UC6 step wizard
  app.js                      entry point (nav + top-level render)
```

Each `uc*.js` file maps to one use case in the spec, so it's easy to point
at a specific file when explaining a specific use case.

## Running it

The files use ES module `import`/`export`, which browsers block over the
`file://` protocol (CORS). Serve the folder instead of double-clicking
`index.html`:

```bash
# from inside railway-reservation-system/
python3 -m http.server 8000
# then open http://localhost:8000
```

Or use VS Code's "Live Server" extension, or push this folder to GitHub
and enable **GitHub Pages** — it will work directly there.

## Notes

- Trains, fares and seat counts are mock data in `data.js` — no backend.
- Payments are simulated in `uc5-payment.js`. Any card number succeeds
  except `4000000000000002`, which simulates a decline.
- Bookings persist in the browser's storage between reloads, so "My
  Bookings" and "PNR Status" have real data to show.
=======
# Railway-Reservation-System
developing a RRS via Online so the booking of ticket will be at ease for the user through the app
>>>>>>> 54082cca6b31ee23fd10141f05d540e0d8b25729
