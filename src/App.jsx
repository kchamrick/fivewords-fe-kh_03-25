// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'src/components/context/AuthContext.jsx';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from 'src/components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/user/Profile';
import CreateGame from './components/game/createGame';
import GameList from './components/game/gameList';
import GameDetails from './components/game/gameDetails';
import NotFound from './components/pages/NotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/games" element={<GameList />} />
              <Route path="/games/create" element={<CreateGame />} />
              <Route path="/games/:id" element={<GameDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;