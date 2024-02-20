import { useState, useEffect } from "react";
import "../styles/note.css";

const Note = ({ note, unsortedNotes, setUnsortedNotes }) => {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  // const [collection, setCollection] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setId(note["_id"]);
    setContent(note["content"]);
    // setCollection(note["collection"]);
  }, []);

  function deleteHandleOnClick() {
    try {
      fetch(`${process.env.API_URL}notes/${id}`, {
        method: "DELETE"
      });

      const oldUnsortedNotes = [...unsortedNotes];
      const newUnsortedNotes = oldUnsortedNotes.filter((note) => note["_id"] !== id)
      setUnsortedNotes(newUnsortedNotes);

    } catch (e) {
      console.log(e);
    }
  }

  function editHandleOnClick() {
    if (!isEditable) {
      const paragraph = document.getElementById(`note-content${id}`);
      const newInput = document.createElement("input");
      newInput.value = content;
      newInput.classList.add("input-content");
      newInput.autofocus;
      newInput.id = `note-content${id}`;
      // newInput.onkeydown = function (e) { (e.key === "Enter") ? editHandleOnClick() : null };
      newInput.onchange = function (e) { setContent(e.target.value) };
      paragraph.parentNode.replaceChild(newInput, paragraph);

      setIsEditable(true);
    } else {
      try {
        const body = { "content": content }
        fetch(`${process.env.API_URL}notes/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      } catch (e) {
        console.log(e);
      }

      const input = document.getElementById(`note-content${id}`);
      const newParagraph = document.createElement("p");
      newParagraph.innerHTML = content;
      newParagraph.classList.add("note-content");
      newParagraph.classList.add("inline");
      newParagraph.id = `note-content${id}`;
      input.parentNode.replaceChild(newParagraph, input);

      setIsEditable(false);
    }
  }

  return (
    <section className="note-container">
      <div className="note">
        <div className="note-content-container">
          <p className="inline">☆</p>
          <p className="inline note-content" id={`note-content${id}`}>{content}</p>
        </div>
      </div>
      <div className="btn-container">
        <button className="note-btn" onClick={editHandleOnClick}><span class="material-symbols-outlined">edit</span></button>
        <button className="note-btn" onClick={deleteHandleOnClick}><span class="material-symbols-outlined">delete</span></button>
      </div>
    </section >
  )
}

export default Note;