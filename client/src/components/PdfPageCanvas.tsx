/* জীবন-ড্যাশবোর্ড: cached canvas rendering keeps PDF pages fast and inside the app. */
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerSource from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import { useEffect, useRef, useState } from "react";

GlobalWorkerOptions.workerSrc = workerSource;

type PdfPageCanvasProps = { source: string; page: number };
const documentCache = new Map<string, Promise<PDFDocumentProxy>>();

function loadPdf(source: string) {
  const cached = documentCache.get(source);
  if (cached) return cached;
  const task = getDocument({
    url: source,
    withCredentials: false,
    rangeChunkSize: 1024 * 1024,
    disableAutoFetch: false,
    disableStream: false,
  });
  const documentPromise = task.promise.catch((error) => {
    documentCache.delete(source);
    throw error;
  });
  documentCache.set(source, documentPromise);
  return documentPromise;
}

export function prefetchPdfPages(source: string, pages: number[]) {
  void loadPdf(source)
    .then((document) => Promise.all(pages.map((page) => document.getPage(page))).then(() => undefined))
    .catch(() => undefined);
}

export function PdfPageCanvas({ source, page }: PdfPageCanvasProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const renderPage = async () => {
      try {
        setState("loading");
        const document = await loadPdf(source);
        const documentPage = await document.getPage(page);
        const canvas = canvasRef.current;
        const shell = shellRef.current;
        if (!canvas || !shell || cancelled) return;
        const baseViewport = documentPage.getViewport({ scale: 1 });
        const availableWidth = Math.max(280, shell.clientWidth - 24);
        const displayScale = Math.min(2.15, availableWidth / baseViewport.width);
        const displayViewport = documentPage.getViewport({ scale: displayScale });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("Canvas context unavailable");
        canvas.width = Math.floor(displayViewport.width * pixelRatio);
        canvas.height = Math.floor(displayViewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(displayViewport.width)}px`;
        canvas.style.height = `${Math.floor(displayViewport.height)}px`;
        await documentPage.render({
          canvas,
          canvasContext: context,
          viewport: displayViewport,
          transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
        }).promise;
        if (!cancelled) setState("ready");
      } catch (error) {
        if (!cancelled) {
          console.error("PDF page rendering failed", error);
          setState("error");
        }
      }
    };
    void renderPage();
    return () => { cancelled = true; };
  }, [page, source]);

  return <div ref={shellRef} className={`pdf-canvas-viewer pdf-canvas-viewer--${state}`} aria-busy={state === "loading"}>
    {state === "loading" && <div className="pdf-canvas-viewer__status"><span />পৃষ্ঠা প্রস্তুত হচ্ছে…</div>}
    {state === "error" && <div className="pdf-canvas-viewer__status pdf-canvas-viewer__status--error">এই পৃষ্ঠাটি এখনই দেখা গেল না। আবার চেষ্টা করো।</div>}
    <canvas ref={canvasRef} aria-label={`বইয়ের পৃষ্ঠা ${page}`} />
  </div>;
}
