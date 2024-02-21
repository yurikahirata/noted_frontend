import "../styles/notes.css";

const DefaultNotesTitle = ({ collection }) => {
  return <h1 className="title">{(collection !== "unsorted") ? collection : "unsorted thoughts"}</h1>
}

export default DefaultNotesTitle;