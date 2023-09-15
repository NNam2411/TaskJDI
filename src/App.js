import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Hello from "./Hello";
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
