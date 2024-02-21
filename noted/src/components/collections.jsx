import { useState, useEffect } from "react";
import "../styles/collections.css";
import CollectionButton from "./collectionButton";
import DefaultNewCollectionBtn from "./defaultNewCollectionBtn";
import EditableNewCollectionBtn from "./editableNewCollectionBtn";

const Collections = ({ collections, setCollection, setCollections, username, isHome }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [collectionNames, setCollectionNames] = useState([]);
  // const unsortedCollection = [];

  useEffect(() => {
    // let unsortedIndex;

    for (const collection of collections) {
      setCollectionNames((prev) => {
        const newArray = [...prev, collection["collectionName"]];
        return newArray;
      })

      // if (collection["collectionName"] === "unsorted") {
      //   unsortedIndex = collections.indexOf(collection);
      // }
    }

    // unsortedCollection.push(collections[unsortedIndex]);
    // unsortedCollection.push(collections[unsortedIndex]["_id"]);
  }, [])

  return (
    <div className="collections">
      {/* <CollectionButton collection={unsortedCollection[0]} setCollection={setCollection} key={unsortedCollection[1]} isHome={isHome} /> */}
      {collections.map((collection) => (
        <CollectionButton collection={collection} setCollection={setCollection} key={collection["_id"]} isHome={isHome} />
      ))}
      {!isEditable ? <DefaultNewCollectionBtn setIsEditable={setIsEditable} setCollection={setCollection} /> : <EditableNewCollectionBtn setIsEditable={setIsEditable} collectionNames={collectionNames} setCollectionNames={setCollectionNames} username={username} collections={collections} setCollections={setCollections} setCollection={setCollection} />}
    </div>
  )
}

export default Collections;