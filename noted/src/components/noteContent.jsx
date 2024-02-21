// USED IN note.jsx COMPONENT
import "../styles/note.css";

const NoteContent = ({ content, id }) => {
  return (
    <p className="inline note-content" id={`note-content${id}`}>{content}</p>
  )
}

export default NoteContent;