import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ReaderProvider } from "./contexts/ReaderContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ChapterPage from "./pages/ChapterPage";
import Home from "./pages/Home";
import PageReader from "./pages/PageReader";
import Workbook from "./pages/Workbook";

function Router() {
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <WouterRouter base={base}><Switch><Route path="/" component={Home} /><Route path="/book/:bookId/page/:page" component={PageReader} /><Route path="/book/:bookId/chapter/:id" component={ChapterPage} /><Route path="/book/:bookId/workbook" component={Workbook} /><Route path="/chapter/:id" component={ChapterPage} /><Route path="/workbook" component={Workbook} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></WouterRouter>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><ReaderProvider><TooltipProvider><Toaster /><Router /></TooltipProvider></ReaderProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
