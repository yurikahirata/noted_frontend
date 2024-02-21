import { useState, useEffect } from "react";
import "../styles/collections.css";
import CollectionButton from "./collectionButton";
import DefaultNewCollectionBtn from "./defaultNewCollectionBtn";
import EditableNewCollectionBtn from "./editableNewCollectionBtn";

const Collections = ({ collections, setCollection, setCollections, username, isHome }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [collectionNames, setCollectionNames] = useState([]);
  const [unsortedCollection, setUnsortedCollection] = useState({});
  let unsortedCollectionId;

  useEffect(() => {
    let unsortedIndex;

    for (const collection of collections) {
      setCollectionNames((prev) => {
        const newArray = [...prev, collection["collectionName"]];
        return newArray;
      })

      if (collection["collectionName"] === "unsorted") {
        unsortedIndex = collections.indexOf(collection);
      }
    }

    setUnsortedCollection((prev) => {
      const newObject = Object.assign({}, collections[unsortedIndex]);
      return newObject;
    })

    unsortedCollectionId = unsortedCollection["_id"];
  }, [])

  return (
    <div className="collections">
      <CollectionButton collection={unsortedCollection} setCollection={setCollection} key={unsortedCollectionId} isHome={isHome} />
      {collections.map((collection) => (
        (collection["collectionName"] !== "unsorted") ? <CollectionButton collection={collection} setCollection={setCollection} key={collection["_id"]} isHome={isHome} /> : null
      ))}
      {!isEditable ? <DefaultNewCollectionBtn setIsEditable={setIsEditable} setCollection={setCollection} /> : <EditableNewCollectionBtn setIsEditable={setIsEditable} collectionNames={collectionNames} setCollectionNames={setCollectionNames} username={username} collections={collections} setCollections={setCollections} setCollection={setCollection} />}
    </div>
  )
}

export default Collections;