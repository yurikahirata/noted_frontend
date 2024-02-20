import "../styles/note.css";

const EditNoteContent = ({ content, setContent, id }) => {
  return (
    <input type="text" className="input-content" value={content} onChange={(e) => setContent(e.target.value)} id={`note-content${id}`} autoFocus />
  )
}

export default EditNoteContent;