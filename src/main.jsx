import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import App from './App';
import UserProfile from './components/user/UserProfile'; // Importa el componente

const sessionId = localStorage.getItem('session_id'); // Obtén el session_id desde el almacenamiento local

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profile" element={<UserProfile sessionId={sessionId} />} /> {/* Nueva ruta */}
    </Routes>
  </Router>
);
