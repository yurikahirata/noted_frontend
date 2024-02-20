import "../styles/collections.css";

const DefaultNewCollectionBtn = ({ setIsEditable, setCollection }) => {
  function handleOnClick() {
    setIsEditable(true);
    setCollection("unsorted");
  }

  return (
    <button className="collection" onClick={handleOnClick}>+ new collection</button>
  )
}

export default DefaultNewCollectionBtn;