import { lazy, Suspense } from "react";
import { LoadingPage } from "./pages/LoadingPage";

const StopWatch = lazy(() => import("./pages/StopWatch/StopWatch"));

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <StopWatch />
    </Suspense>
  );
}

export default App;
