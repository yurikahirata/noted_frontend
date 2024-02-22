// USED IN notes.jsx PAGE
import { useState, useEffect } from "react";
import "../styles/notes.css";
import Note from "./note";
import DefaultNotesTitle from "./defaultNotesTitle";
import EditableNotesTitle from "./editableNotesTitle";

const NoteContainer = ({ collection, setCollection, collections, setCollections, setIsHome, username, notes, setNotes }) => {
  const [isLoading, setIsLoading] = useState(""); // Text while fetching
  const [isTitleEditable, setIsTitleEditable] = useState(false); // Toggles collection title from h1 to input
  const [collectionId, setCollectionId] = useState("");
  const [newCollectionTitle, setNewCollectionTitle] = useState(collection);
  const [collectionNames, setCollectionNames] = useState([]); // Array with all collection names

  useEffect(() => {
    for (const collection of collections) {
      setCollectionNames((prev) => {
        const newArray = [...prev, collection["collectionName"]];
        return newArray;
      })
    }
  }, [])

  useEffect(() => {
    setIsHome(false);
    setIsLoading("Loading...");

    async function fetchNotes() {
      try {
        const body = { "username": username };
        const notes = await fetch(`${process.env.API_URL}/notes/username/${collection}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const parsedNotes = await notes.json();
        setNotes(parsedNotes);
        setIsLoading("");
      }
      catch (e) {
        console.log(e);
      }
    }

    fetchNotes();

    for (const thisCollection of collections) {
      if (thisCollection["collectionName"] === collection) {
        setCollectionId(thisCollection["_id"]);
      }
    }

  }, [collection]);

  // Add new note in folder
  async function addNoteHandleOnClick() {
    const body = { "username": username, "content": "", "collection": collection };

    try {
      setIsLoading("Loading...");
      const result = await fetch(`${process.env.API_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parsedResult = await result.json();
      const newId = parsedResult["insertedId"];
      body["_id"] = newId;

      setNotes((prev) => {
        const newArray = [body, ...prev];
        return newArray;
      })
      setIsLoading("")
    } catch (e) {
      console.log(e);
    }

  }

  async function editTitleHandleOnClick() {
    if (!isTitleEditable) {
      setIsTitleEditable(true)
    } else {

      const regex = new RegExp('^[a-zA-Z0-9-.~\w ]*$');

      if (!collectionNames.includes(newCollectionTitle) && newCollectionTitle.length > 0 && regex.test(newCollectionTitle)) {
        try {
          const titleBody = { "username": username, "collectionName": newCollectionTitle };
          await fetch(`${process.env.API_URL}/collections/${collectionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(titleBody),
          });

          const collectionBody = { "username": username, "collection": newCollectionTitle }
          await fetch(`${process.env.API_URL}/notes/username/${collection}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collectionBody),
          });

          let indexToChange;
          for (const index in collections) {
            if (collections[index]["collectionName"] === collection) {
              indexToChange = index;
            }
          }

          setCollectionNames((prev) => {
            const newArray = [...prev];
            newArray[indexToChange] = newCollectionTitle;
            return newArray;
          });

          await setCollections((prev) => {
            const newObj = Object.assign({}, collections[indexToChange]);
            newObj["collectionName"] = newCollectionTitle;

            const newArray = [...prev];
            newArray.splice(indexToChange, 1, newObj);

            return newArray;
          });

          await setCollection(newCollectionTitle);
        } catch (e) {
          console.log(e);
        }
      }
      setIsTitleEditable(false);
    }
  }

  async function deleteCollectionOnClick() {
    if (confirm("fr?")) {
      try {
        setIsLoading("Loading...");
        fetch(`${process.env.API_URL}/collections/${collectionId}`, {
          method: "DELETE"
        });

        fetch(`${process.env.API_URL}/notes/${username}/${collection}`, {
          method: "DELETE"
        });

        await setCollections((prev) => {
          const newArray = prev.filter((thisCollection) => thisCollection["collectionName"] != collection);
          return newArray;
        });
        setIsLoading("")

        await setCollection("unsorted");
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <section className="notes-section">
      {/* <DefaultNotesTitle collection={collection} /> */}
      {isTitleEditable ? <EditableNotesTitle editTitleHandleOnClick={editTitleHandleOnClick} newCollectionTitle={newCollectionTitle} setNewCollectionTitle={setNewCollectionTitle} isTitleEditable={isTitleEditable} /> : <DefaultNotesTitle collection={collection} />}
      <div>
        {(collection !== "unsorted") ? <button className="edit-folder-btn" onClick={editTitleHandleOnClick}><span className="material-symbols-outlined">edit</span></button> : null}
        {(collection !== "unsorted") ? <button className="edit-folder-btn" onClick={deleteCollectionOnClick}><span className="material-symbols-outlined">delete</span></button> : null}
      </div>
      <p>{isLoading}</p>
      <button className="add-note" onClick={addNoteHandleOnClick}>+</button>
      <div className="listed-notes">
        {notes.map((note) => (
          <Note key={note["_id"]} note={note} notes={notes} setNotes={setNotes} collections={collections} />
        ))}
      </div>
    </section>
  )
}

export default NoteContainer;