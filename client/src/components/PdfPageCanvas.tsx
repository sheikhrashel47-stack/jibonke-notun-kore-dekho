/* জীবন-ড্যাশবোর্ড: cached canvas rendering keeps PDF pages fast and inside the app. */
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerSource from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import { useEffect, useRef, useState } from "react";

GlobalWorkerOptions.workerSrc = workerSource;

type PdfPageCanvasProps = { source: string; page: number; fit?: "width" | "contain" };
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

export function PdfPageCanvas({ source, page, fit = "width" }: PdfPageCanvasProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [layoutVersion, setLayoutVersion] = useState(0);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const observer = new ResizeObserver(() => setLayoutVersion((version) => version + 1));
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let activeRenderTask: { cancel: () => void; promise: Promise<unknown> } | null = null;
    const renderPage = async () => {
      try {
        setState("loading");
        const document = await loadPdf(source);
        const documentPage = await document.getPage(page);
        const canvas = canvasRef.current;
        const shell = shellRef.current;
        if (!canvas || !shell || cancelled) return;
        const baseViewport = documentPage.getViewport({ scale: 1 });
        const availableWidth = Math.max(280, shell.clientWidth - (fit === "contain" ? 0 : 24));
        const availableHeight = Math.max(280, shell.clientHeight - (fit === "contain" ? 0 : 24));
        const displayScale = fit === "contain"
          ? Math.min(2.45, availableWidth / baseViewport.width, availableHeight / baseViewport.height)
          : Math.min(2.15, availableWidth / baseViewport.width);
        const displayViewport = documentPage.getViewport({ scale: displayScale });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("Canvas context unavailable");
        canvas.width = Math.floor(displayViewport.width * pixelRatio);
        canvas.height = Math.floor(displayViewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(displayViewport.width)}px`;
        canvas.style.height = `${Math.floor(displayViewport.height)}px`;
        activeRenderTask = documentPage.render({
          canvas,
          canvasContext: context,
          viewport: displayViewport,
          transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
        });
        await activeRenderTask.promise;
        if (!cancelled) setState("ready");
      } catch (error) {
        if (!cancelled && !(error instanceof Error && error.name === "RenderingCancelledException")) {
          console.error("PDF page rendering failed", error);
          setState("error");
        }
      }
    };
    void renderPage();
    return () => {
      cancelled = true;
      activeRenderTask?.cancel();
    };
  }, [fit, layoutVersion, page, source]);

  return <div ref={shellRef} className={`pdf-canvas-viewer pdf-canvas-viewer--${state}`} aria-busy={state === "loading"}>
    {state === "loading" && <div className="pdf-canvas-viewer__status"><span />পৃষ্ঠা প্রস্তুত হচ্ছে…</div>}
    {state === "error" && <div className="pdf-canvas-viewer__status pdf-canvas-viewer__status--error">এই পৃষ্ঠাটি এখনই দেখা গেল না। আবার চেষ্টা করো।</div>}
    <canvas ref={canvasRef} aria-label={`বইয়ের পৃষ্ঠা ${page}`} />
  </div>;
}
