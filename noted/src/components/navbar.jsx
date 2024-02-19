import "../styles/navbar.css"
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();

  function handleOnClick(e) {
    e.preventDefault();
    logout();
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="navbar-item">
          <Link to="/notes">
            <button className="navbar-btn">☆</button>
          </Link>
          <button className="navbar-btn" onClick={handleOnClick}>↲</button>

        </li>
      </ul>
    </nav>
  )
}

export default Navbar;