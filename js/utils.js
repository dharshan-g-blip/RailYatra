/* =========================================================================
   utils.js — small helpers with no dependency on app state.
========================================================================= */

export function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

export function formatINR(n){
  return "₹" + Number(n).toLocaleString("en-IN");
}

export function todayISO(){
  return new Date().toISOString().slice(0,10);
}

export function generatePNR(){
  let n = "";
  for(let i=0;i<10;i++) n += Math.floor(Math.random()*10);
  return n;
}

export function bannerHtml(kind, msg){
  return `<div class="banner ${kind}">${msg}</div>`;
}

export function showToast(msg){
  const t = document.getElementById("toast");
  if(!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
}
