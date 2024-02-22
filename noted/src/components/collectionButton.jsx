// USED IN collections.jsx COMPONENT
import { useState } from "react";
import "../styles/collections.css";
import { useNavigate } from "react-router-dom";

const CollectionButton = ({ collection, setCollection, isHome }) => {
  const navigate = useNavigate();

  function handleOnClick() {
    setCollection(collection["collectionName"]);
    (isHome) ? navigate("/notes", { state: { isCollectionsOpened: true } }) : null; // Keeps collections list open after navigating
  }

  return <button className="collection" key={collection["_id"]} onClick={handleOnClick}>{collection["collectionName"]}</button>
}

export default CollectionButton;