/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Hello from './pages/Hello';
import FoodStore from './components/FoodStore/FoodStore';
import Garage from './components/Garage/Garage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/" element={<Garage />} />
          <Route path="/hello" element={<Hello />} />
          <Route path="/food" element={<FoodStore />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
