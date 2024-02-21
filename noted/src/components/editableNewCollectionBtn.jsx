import { useState } from "react";
import "../styles/collections.css";

const EditableNewCollectionBtn = ({ setIsEditable, collectionNames, setCollectionNames, username, collections, setCollections, setCollection }) => {
  const [collectionName, setCollectionName] = useState("");

  function handleOnKeyUp(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleOnBlur();
    }
  }

  async function handleOnBlur() {
    if (!collectionNames.includes(collectionName) && collectionName.length > 0) {
      try {
        const body = { "collectionName": collectionName, "username": username };

        const result = await fetch(`${process.env.API_URL}/collections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        const parsedResult = await result.json();
        const newId = parsedResult["insertedId"];
        body["_id"] = newId;

        setCollections((prev) => {
          const newArray = [body, ...prev];
          return newArray;
        });

        setCollectionNames((prev) => {
          const newArray = [...prev, collectionName];
          return newArray;
        })

        setCollection(collectionName);
        //setIsEditable(false);
      } catch (e) {
        console.log(e);
      }
    }
    setIsEditable(false);
  }

  return (
    <button className="collection"> +
      <input className="new-colllection-input" type="text" placeholder="new collection" autoFocus value={collectionName} onChange={(e) => setCollectionName(e.target.value)} onBlur={handleOnBlur} onKeyUp={handleOnKeyUp} />
    </button >
  )
}

export default EditableNewCollectionBtn;