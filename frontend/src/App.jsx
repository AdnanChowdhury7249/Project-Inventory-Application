import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import ItemFormPage from "./pages/ItemFormPage";
import CategoryEditPage from "./pages/CategoryEditPage";
import ItemEditPage from "./pages/ItemEditPage";
import NavBar from "./components/NavBar";
import AllItemsPage from "./pages/AllItemsPage";

function App() {
  return (

    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/items" element={<AllItemsPage />} />
        <Route path="/category/:id" element={<ItemsPage />} />
        <Route path="/create-category" element={<CategoryFormPage />} />
        <Route path="/category/:id/edit" element={<CategoryEditPage />} />
        <Route path="/item/:id/edit" element={<ItemEditPage />} />
        <Route path="/category/:id/add-item" element={<ItemFormPage />} />
      </Routes>

    </Router>
  );
}

export default App;
