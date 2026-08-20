/* জীবন-ড্যাশবোর্ড: locally rendered PDF page surface for precise, stable page reading. */
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import workerSource from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import { useEffect, useRef, useState } from "react";

GlobalWorkerOptions.workerSrc = workerSource;

type PdfPageCanvasProps = {
  source: string;
  page: number;
};

export function PdfPageCanvas({ source, page }: PdfPageCanvasProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    const loadingTask = getDocument({ url: source });

    const renderPage = async () => {
      try {
        setState("loading");
        const document = await loadingTask.promise;
        const documentPage = await document.getPage(page);
        const canvas = canvasRef.current;
        const shell = shellRef.current;
        if (!canvas || !shell || cancelled) return;

        const baseViewport = documentPage.getViewport({ scale: 1 });
        const availableWidth = Math.max(280, shell.clientWidth - 34);
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
    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [page, source]);

  return <div ref={shellRef} className={`pdf-canvas-viewer pdf-canvas-viewer--${state}`} aria-busy={state === "loading"}>
    {state === "loading" && <div className="pdf-canvas-viewer__status"><span />পৃষ্ঠা তৈরি হচ্ছে…</div>}
    {state === "error" && <div className="pdf-canvas-viewer__status pdf-canvas-viewer__status--error">এই পৃষ্ঠাটি এখানেই দেখা গেল না। নিচের লিংক দিয়ে আলাদা tab-এ খোলো।</div>}
    <canvas ref={canvasRef} aria-label={`বইয়ের পৃষ্ঠা ${page}`} />
  </div>;
}
