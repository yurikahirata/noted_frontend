import { useState, useEffect } from "react";
import "../styles/notes.css";
import Note from "./note";

const NoteContainer = ({ collection, setIsHome, username, notes, setNotes }) => {
  // const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    setIsHome(false);
    setIsLoading("Loading...");
    async function fetchNotes() {
      const notes = await fetch(`${process.env.API_URL}notes/${username}/${collection}`);
      const parsedNotes = await notes.json();
      setNotes(parsedNotes);
      setIsLoading("");
    }

    fetchNotes();
  }, [collection]);

  // Add new note in folder
  async function handleOnClick() {
    const body = { "username": username, "content": "", "collection": collection };
    const result = await fetch(`${process.env.API_URL}notes/`, {
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

  return (
    <section className="notes-section">
      <h1 className="title">{(collection !== "unsorted") ? collection : "unsorted thoughts"}</h1>
      <p>{isLoading}</p>
      <button className="add-note" onClick={handleOnClick}>+</button>
      <div className="listed-notes">
        {notes.map((note) => (
          <Note key={note["_id"]} note={note} notes={notes} setNotes={setNotes} />
        ))}
      </div>
    </section>
  )
}

export default NoteContainer;