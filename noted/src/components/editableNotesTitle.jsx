// USED IN noteContainer.jsx COMPONENT
import "../styles/notes.css";
const EditableNotesTitle = ({ editTitleHandleOnClick, newCollectionTitle, setNewCollectionTitle, isTitleEditable }) => {

  function handleOnBlur() {
    if (!isTitleEditable) // If blurred not because edit button was clicked
      editTitleHandleOnClick();
  }

  function handleOnKeyDown(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      editTitleHandleOnClick();
    }
  }

  return (
    <input type="text" id="editableTitle" className="editable-title" value={newCollectionTitle} onChange={(e) => setNewCollectionTitle(e.target.value)} onKeyDown={handleOnKeyDown} onBlur={handleOnBlur} autoFocus />
  )
};

export default EditableNotesTitle;