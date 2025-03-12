import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import ItemFormPage from "./pages/ItemFormPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:id" element={<ItemsPage />} />
        <Route path="/create-category" element={<CategoryFormPage />} />
        <Route path="/category/:id/add-item" element={<ItemFormPage />} />

      </Routes>
    </Router>
  );
}

export default App;
