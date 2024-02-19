import Root from './pages/root.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';
import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App;