import { useState } from "react";
import "../styles/collections.css";

const EditableNewCollectionBtn = ({ setIsEditable, collectionNames, setCollectionNames, username, setCollections, setCollection }) => {
  const [collectionName, setCollectionName] = useState("");

  function handleOnKeyUp(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleOnBlur();
    }
  }

  async function handleOnBlur() {
    const regex = new RegExp('^[a-zA-Z0-9-.~\w\s]*$');

    if (!collectionNames.includes(collectionName) && collectionName.length > 0 && regex.test(collectionName)) {

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

        await setCollection(collectionName);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("hey bestie! \n\ncollection names have to be unique, can't be empty, and can only consists of these characters: \n\u2022alphanumeric character (a-zA-Z0-9)\n\u2022space ( )\n\u2022dash (-)\n\u2022underscore (_)\n\u2022tilde (~)\n\u2022period (.)  \n\nthanks:)");
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