import { useState, useEffect } from "react";
import "../styles/note.css";
import EditNoteContent from "./editNoteContent";
import NoteContent from "./noteContent";
import MoveToCollectionBtn from "./moveToCollectionBtn";

const Note = ({ note, notes, setNotes, collections }) => {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setId(note["_id"]);
    setContent(note["content"]);
  }, []);

  function deleteHandleOnClick() {
    try {
      fetch(`${process.env.API_URL}/notes/${id}`, {
        method: "DELETE"
      });

      const oldNotes = [...notes];
      const newNotes = oldNotes.filter((note) => note["_id"] !== id)
      setNotes(newNotes);

    } catch (e) {
      console.log(e);
    }
  }

  function editHandleOnClick() {
    if (!isEditable) {
      setIsEditable(true);
    } else {
      try {
        const body = { "content": content }
        fetch(`${process.env.API_URL}/notes/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      } catch (e) {
        console.log(e);
      }

      setIsEditable(false);
    }
  }

  return (
    <section className="note-container">
      <div className="note">
        <div className="note-content-container">
          <p className="inline">☆</p>
          {(isEditable) ? <EditNoteContent content={content} setContent={setContent} id={id} editHandleOnClick={editHandleOnClick} /> : <NoteContent content={content} id={id} />}
        </div>
      </div>
      <div className="btn-container">
        <button className="note-btn" onClick={editHandleOnClick}><span className="material-symbols-outlined">edit</span></button>
        <button className="note-btn" onClick={deleteHandleOnClick}><span className="material-symbols-outlined">delete</span></button>
        <div className="dropdown">
          <button className="dropbtn">⇰</button>
          <div className="dropdown-content">
            {collections.map((collection) => (
              (note["collection"] !== collection["collectionName"]) ? <MoveToCollectionBtn key={collection["_id"]} keyId={collection["_id"]} collectionName={collection["collectionName"]} thisNote={note} notes={notes} setNotes={setNotes} /> : null
            ))}
          </div>
        </div>

      </div>
    </section >
  )
}

export default Note;