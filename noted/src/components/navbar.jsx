// USED IN home.jsx AND notes.jsx PAGE
import "../styles/navbar.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import Collections from "./collections";

const Navbar = ({ isHome, collections, setCollection, setCollections, username, isCollectionsOpen, setIsCollectionsOpen }) => {
  const { logout } = useAuth();
  const [isCollectionsClicked, setIsCollectionsClicked] = useState(false); // Toggles list of collections

  useEffect(() => {
    isCollectionsOpen ? setIsCollectionsClicked(true) : null;
  }, [])

  function logoutHandleOnClick(e) {
    e.preventDefault();
    logout();
  }

  function collectionsHandleOnClick() {
    if (isCollectionsClicked) {
      setIsCollectionsClicked(false);
      setIsCollectionsOpen(false);
    } else {
      setIsCollectionsClicked(true);
      setIsCollectionsOpen(true);
    }
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <Link to={(isHome) ? "/notes" : "/home"}>
          <button className="navbar-btn">☆</button>
        </Link>
        <div id="collections">
          <button className="navbar-btn" onClick={collectionsHandleOnClick}>❒</button>
          {isCollectionsClicked ? <Collections collections={collections} setCollection={setCollection} setCollections={setCollections} username={username} isHome={isHome} /> : null}
        </div>
        <button className="navbar-btn" onClick={logoutHandleOnClick}>↲</button>
      </ul>
    </nav >
  )
}

export default Navbar;