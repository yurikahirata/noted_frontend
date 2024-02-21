const EditableNotesTitle = ({ collection, setCollection }) => {
  return (
    <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} autoFocus />
  )
};

export default EditableNotesTitle;