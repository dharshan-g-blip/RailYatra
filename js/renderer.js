/* =========================================================================
   renderer.js — lets every module trigger a re-render without importing
   app.js directly (which would create a circular import, since app.js
   imports every UC module). app.js calls setRender() once on startup;
   everyone else just calls render().
========================================================================= */

export let render = () => {};

export function setRender(fn){
  render = fn;
}
