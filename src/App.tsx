import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CategoryList } from "./components/category-list/category-list";
import { ErrorPage } from "./components/error-page/error-page";
import { Suspense } from "react";
import { LoadingScreen } from "./components/loading-screen/loading-screen";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
