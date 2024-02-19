import { useState } from 'react';
import Root from './pages/root.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';
import Notes from './pages/notes.jsx';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';

const App = () => {
  const [username, setUsername] = useState("");

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="login" element={<Login setUsername={setUsername} />} />
        <Route path="signup" element={<Signup setUsername={setUsername} />} />
        <Route path="home" element={
          <ProtectedRoute>
            <Home username={username} />
          </ProtectedRoute>
        }
        />
        <Route path="notes" element={<Notes username={username} />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;