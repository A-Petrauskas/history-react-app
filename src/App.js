import './App.css';
import { Routes, Route } from "react-router-dom";
import LevelSelection from './pages/LevelSelection';
import LevelPlay from './pages/LevelPlay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LevelSelection />} />
      <Route path="/level" element={<LevelPlay />} />
    </Routes>
  );
}

export default App;