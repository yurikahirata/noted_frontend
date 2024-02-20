import "../styles/navbar.css"
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Navbar = ({ isHome }) => {
  const { logout } = useAuth();

  function logoutHandleOnClick(e) {
    e.preventDefault();
    logout();
  }

  function foldersHandleOnClick() {

  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {/* <li className="navbar-item"> */}
        <Link to={(isHome) ? "/notes" : "/home"}>
          <button className="navbar-btn">☆</button>
        </Link>
        <div id="folders">
          <button className="navbar-btn" onClick={foldersHandleOnClick}>❒</button>
          <p className="folder">folder</p>
        </div>
        <button className="navbar-btn" onClick={logoutHandleOnClick}>↲</button>
        {/* </li> */}
      </ul>
    </nav>
  )
}

export default Navbar;