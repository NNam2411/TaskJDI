import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Hello from "./pages/Hello";
import FoodStore from "./components/FoodStore/FoodStore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/food" element={<FoodStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
