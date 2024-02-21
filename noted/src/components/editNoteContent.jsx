// USED IN note.jsx COMPONENT
import "../styles/note.css";

const EditNoteContent = ({ content, setContent, id, editHandleOnClick }) => {

  function handleOnKeyDown(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      editHandleOnClick();
    }
  }

  return (
    <input type="text" className="input-content" value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={handleOnKeyDown} id={`note-content${id}`} autoFocus />
  )
}

export default EditNoteContent;