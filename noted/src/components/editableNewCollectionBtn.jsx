import { useState } from "react";
import "../styles/collections.css";

const EditableNewCollectionBtn = ({ setIsEditable, collectionNames, username, collections, setCollections }) => {
  const [collectionName, setCollectionName] = useState("");

  async function handleOnBlur() {
    if (!collectionNames.includes(collectionName) && collectionName.length > 0) {
      try {
        console.log(collections);
        const body = { "collectionName": collectionName, "username": username };

        const result = await fetch(`${process.env.API_URL}collections`, {
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

        setIsEditable(false);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <button className="collection"> +
      <input className="new-colllection-input" type="text" placeholder="new collection" autoFocus value={collectionName} onChange={(e) => setCollectionName(e.target.value)} onBlur={handleOnBlur} />
    </button >
  )
}

export default EditableNewCollectionBtn;