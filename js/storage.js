/* =========================================================================
   storage.js — persistence layer.
   Bookings are personal to this browser and keyed as booking:<PNR>.
   Backs UC6 (save on generation), UC7 (lookup), UC8 (cancel/update),
   UC9 (list history) — and survives a page refresh.

   Uses the browser's built-in localStorage. That means bookings live on
   this device/browser only (clearing browser data wipes them, and a
   different device won't see them) — there's no backend/database here.
   If you later add a real backend, swap the four functions below for
   fetch() calls to your API; nothing else in the app needs to change.
========================================================================= */

function storageAvailable(){
  try{
    const k = "__storage_test__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  }catch(err){
    return false; // private/incognito mode with storage disabled, or unsupported
  }
}

export async function saveBooking(record){
  try{
    if(!storageAvailable()) throw new Error("localStorage unavailable");
    window.localStorage.setItem("booking:" + record.pnr, JSON.stringify(record));
    return true;
  }catch(err){
    console.error("Storage error while saving booking:", err);
    return false;
  }
}

export async function getBooking(pnr){
  try{
    const raw = window.localStorage.getItem("booking:" + pnr);
    return raw ? JSON.parse(raw) : null;
  }catch(err){
    return null; // key not found or storage error
  }
}

export async function listBookings(){
  try{
    const records = [];
    for(let i = 0; i < window.localStorage.length; i++){
      const key = window.localStorage.key(i);
      if(!key || !key.startsWith("booking:")) continue;
      try{
        const raw = window.localStorage.getItem(key);
        if(raw) records.push(JSON.parse(raw));
      }catch(e){ /* skip malformed entry */ }
    }
    return records.filter(Boolean).sort((a,b) => b.bookedAt - a.bookedAt);
  }catch(err){
    console.error("Storage error while listing bookings:", err);
    return [];
  }
}

export async function clearAllBookings(){
  try{
    const keys = [];
    for(let i = 0; i < window.localStorage.length; i++){
      const key = window.localStorage.key(i);
      if(key && key.startsWith("booking:")) keys.push(key);
    }
    keys.forEach(k => window.localStorage.removeItem(k));
    return true;
  }catch(err){
    console.error("Storage error while clearing bookings:", err);
    return false;
  }
}
