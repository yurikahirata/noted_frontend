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

  return (
    <section className="notes-section">
      <h1 className="title">{(collection !== "unsorted") ? collection : "unsorted thoughts"}</h1>
      <p>{isLoading}</p>
      <div className="listed-notes">
        {notes.map((note) => (
          <Note key={note["_id"]} note={note} notes={notes} setNotes={setNotes} />
        ))}
      </div>
    </section>
  )
}

export default NoteContainer;