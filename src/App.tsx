import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CategoryList } from "./components/category-list/category-list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryList />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
