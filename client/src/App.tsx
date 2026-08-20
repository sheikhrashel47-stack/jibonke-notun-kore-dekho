import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { JibonAppShell } from "./components/JibonAppShell";
import { ReaderProvider } from "./contexts/ReaderContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import BookDetail from "./pages/BookDetail";
import BookMap from "./pages/BookMap";
import ChapterPage from "./pages/ChapterPage";
import Home from "./pages/Home";
import Library from "./pages/Library";
import PageReader from "./pages/PageReader";
import Profile from "./pages/Profile";
import Progress from "./pages/Progress";
import ScrollReader from "./pages/ScrollReader";
import Store from "./pages/Store";
import SwipePageReader from "./pages/SwipePageReader";
import Workbook from "./pages/Workbook";

function Router() {
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
  const appRoute = (Component: React.ComponentType) => () => <JibonAppShell><Component /></JibonAppShell>;
  return <WouterRouter base={base}><Switch><Route path="/book/:bookId/swipe/:page" component={SwipePageReader} /><Route path="/book/:bookId/page/:page" component={PageReader} /><Route path="/book/:bookId/scroll" component={ScrollReader} /><Route path="/book/:bookId/chapter/:id" component={ChapterPage} /><Route path="/book/:bookId/workbook" component={Workbook} /><Route path="/store/book/:bookId/map" component={appRoute(BookMap)} /><Route path="/book/:bookId/map" component={appRoute(BookMap)} /><Route path="/store/book/:bookId" component={appRoute(BookDetail)} /><Route path="/book/:bookId" component={appRoute(BookDetail)} /><Route path="/library" component={appRoute(Library)} /><Route path="/store" component={appRoute(Store)} /><Route path="/progress" component={appRoute(Progress)} /><Route path="/profile" component={appRoute(Profile)} /><Route path="/" component={appRoute(Home)} /><Route path="/chapter/:id" component={ChapterPage} /><Route path="/workbook" component={Workbook} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></WouterRouter>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light" switchable><ReaderProvider><TooltipProvider><Toaster /><Router /></TooltipProvider></ReaderProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
