import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";
import CategoryFormPage from "./pages/CategoryFormPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:id" element={<ItemsPage />} />
        <Route path="/create-category" element={<CategoryFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
