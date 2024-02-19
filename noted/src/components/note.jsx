import { useState, useEffect } from "react";
import "../styles/note.css";

const Note = ({ note }) => {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [collection, setCollection] = useState("");

  useEffect(() => {
    setId(note["_id"]);
    setContent(note["content"]);
    setCollection(note["collection"]);
  }, []);

  return (
    <div className="note">
      <p className="inline">☆</p>
      <p className="inline note-content" contentEditable="true" onChange={(e) => setContent(e.target.value)}>{content}</p>
      {/* <input type="text" className="note-input" value={content} onChange={(e) => setContent(e.target.value)} /> */}
    </div>
  )
}

export default Note;