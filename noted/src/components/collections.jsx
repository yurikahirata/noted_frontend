import { useState, useEffect } from "react";
import "../styles/collections.css";
import CollectionButton from "./collectionButton";
import DefaultNewCollectionBtn from "./defaultNewCollectionBtn";
import EditableNewCollectionBtn from "./editableNewCollectionBtn";

const Collections = ({ collections, setCollection, setCollections, username, isHome }) => {
  const [isEditable, setIsEditable] = useState(false);
  const collectionNames = [];

  useEffect(() => {
    for (const collection of collections) {
      collectionNames.push(collection["collectionName"]);
    }
  }, [])

  return (
    <div className="collections">
      {collections.map((collection) => (
        <CollectionButton collection={collection} setCollection={setCollection} key={collection["_id"]} isHome={isHome} />
        // <button className="collection" key={collection["_id"]} onClick={handleOnClick}>{collection["collectionName"]}</button>
      ))}
      {!isEditable ? <DefaultNewCollectionBtn setIsEditable={setIsEditable} setCollection={setCollection} /> : <EditableNewCollectionBtn setIsEditable={setIsEditable} collectionNames={collectionNames} username={username} collections={collections} setCollections={setCollections} />}
    </div>
  )
}

export default Collections;