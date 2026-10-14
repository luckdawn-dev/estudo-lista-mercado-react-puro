import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CategoryList } from "./components/category-list/category-list";
import { ErrorPage } from "./components/error-page/error-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
