import './css/App.css';
import Watchlist from "./pages/Watchlist";
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar"

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
