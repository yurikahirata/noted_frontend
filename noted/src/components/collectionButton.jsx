import "../styles/collections.css";
import { useNavigate } from "react-router-dom";

const CollectionButton = ({ collection, setCollection, isHome }) => {
  const navigate = useNavigate();

  function handleOnClick() {
    (isHome) ? navigate("/notes", { state: { isCollectionsOpened: true } }) : null;
    setCollection(collection["collectionName"]);
  }

  return <button className="collection" key={collection["_id"]} onClick={handleOnClick}>{collection["collectionName"]}</button>
}

export default CollectionButton;