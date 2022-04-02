import './App.css';
import { Routes, Route } from "react-router-dom";
import LevelSelection from './pages/LevelSelection';
import LevelPlay from './pages/LevelPlay';
import LevelCreate from './pages/LevelCreate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LevelSelection />} />
      <Route path="/level/:id/play" element={<LevelPlay />} />
      <Route path="/create" element={<LevelCreate />} />
    </Routes>
  );
}

export default App;