// USED IN notes.jsx PAGE
import { useState, useEffect } from "react";
import "../styles/notes.css";
import Note from "./note";
import DefaultNotesTitle from "./defaultNotesTitle";
import EditableNotesTitle from "./editableNotesTitle";

const NoteContainer = ({ collection, setCollection, collections, setCollections, setIsHome, username, notes, setNotes }) => {
  let oldCollectionName;
  const [isLoading, setIsLoading] = useState(""); // Text while fetching
  // const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [collectionId, setCollectionId] = useState("");

  useEffect(() => {
    setIsHome(false);
    setIsLoading("Loading...");

    async function fetchNotes() {
      try {
        const notes = await fetch(`${process.env.API_URL}/notes/${username}/${collection}`);
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

    //oldCollectionName = collection; --> move this to own useEffect that only runs on initial?
  }, [collection]);

  // Add new note in folder
  async function addNoteHandleOnClick() {
    const body = { "username": username, "content": "", "collection": collection };

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
  }

  // async function editTitleHandleOnClick() {

  //   if (!isTitleEditable) {
  //     setIsTitleEditable(true)
  //   } else {
  //     try {
  //       const titleBody = { "username": username, "collectionName": collection };
  //       await fetch(`${process.env.API_URL}/collections/${collectionId}`, {
  //         method: "PATCH",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(titleBody),
  //       });

  //       const collectionBody = { "collection": collection }
  //       await fetch(`${process.env.API_URL}/notes/${username}/${oldCollectionName}`, {
  //         method: "PATCH",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(collectionBody),
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }

  //     setIsTitleEditable(false);
  //   }
  // }

  async function deleteCollectionOnClick() {
    if (confirm("fr?")) {
      try {
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

        const newView = collections[collections.length - 1]["collectionName"];
        await setCollection(newView);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <section className="notes-section">
      <DefaultNotesTitle collection={collection} />
      {/* {isTitleEditable ? <EditableNotesTitle collection={collection} setCollection={setCollection} /> : <DefaultNotesTitle collection={collection} />} */}
      <div>
        {/* <button className="edit-folder-btn"><span className="material-symbols-outlined" onClick={editTitleHandleOnClick}>edit</span></button> */}
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