/**
 * Client-only PDF export - dynamically imports jspdf and html2canvas
 * to avoid bundling them in the server (reduces Cloudflare worker size).
 * Use only in browser event handlers (e.g. button onClick).
 */
export async function getPdfLibs() {
  const [html2canvasMod, jsPDFMod] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);
  return {
    html2canvas: html2canvasMod.default,
    jsPDF: jsPDFMod.default,
  };
}
