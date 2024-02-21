import "../styles/navbar.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import Collections from "./collections";

const Navbar = ({ isHome, collections, setCollection, setCollections, username, isCollectionsOpen }) => {
  const { logout } = useAuth();
  const [isFolderClicked, setIsFolderClicked] = useState(false);

  useEffect(() => {
    isCollectionsOpen ? setIsFolderClicked(true) : null;
  })

  function logoutHandleOnClick(e) {
    e.preventDefault();
    logout();
  }

  function foldersHandleOnClick() {
    isFolderClicked ? setIsFolderClicked(false) : setIsFolderClicked(true);
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <Link to={(isHome) ? "/notes" : "/home"}>
          <button className="navbar-btn">☆</button>
        </Link>
        <div id="folders">
          <button className="navbar-btn" onClick={foldersHandleOnClick}>❒</button>
          {isFolderClicked ? <Collections collections={collections} setCollection={setCollection} setCollections={setCollections} username={username} isHome={isHome} /> : null}
        </div>
        <button className="navbar-btn" onClick={logoutHandleOnClick}>↲</button>
      </ul>
    </nav >
  )
}

export default Navbar;