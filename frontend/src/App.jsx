import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";

function app() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:id" element={<ItemsPage />} />
      </Routes>
    </Router>
  )
}

export default app;
