// USED IN collections.jsx COMPONENT
import "../styles/collections.css";

const DefaultNewCollectionBtn = ({ setIsEditable }) => {
  function handleOnClick() {
    setIsEditable(true);
  }

  return (
    <button className="collection" onClick={handleOnClick}>+ new collection</button>
  )
}

export default DefaultNewCollectionBtn;