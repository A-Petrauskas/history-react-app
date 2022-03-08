import './App.css';
import { Routes, Route } from "react-router-dom";
import LevelSelection from './pages/LevelSelection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LevelSelection />} />
    </Routes>
  );
}

export default App;