/* =========================================================================
   modal.js — a small reusable confirm dialog.
   Used by uc8-cancelBooking.js, and by uc9-history.js for "Clear all".
========================================================================= */

export function askConfirm(title, body, onConfirm){
  const backdrop = document.getElementById("modal-backdrop");
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").textContent = body;
  backdrop.classList.add("show");

  const confirmBtn = document.getElementById("modal-confirm");
  const dismissBtn = document.getElementById("modal-dismiss");

  const cleanup = () => {
    backdrop.classList.remove("show");
    confirmBtn.onclick = null;
    dismissBtn.onclick = null;
  };

  confirmBtn.onclick = () => { cleanup(); onConfirm(); };
  dismissBtn.onclick = cleanup;
}
