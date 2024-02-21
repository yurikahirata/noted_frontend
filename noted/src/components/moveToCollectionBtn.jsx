const MoveToCollectionBtn = ({ keyId, collectionName, thisNote, notes, setNotes }) => {

  async function handleOnClick() {
    const body = { "collection": collectionName };

    try {
      await fetch(`${process.env.API_URL}/notes/${thisNote["_id"]}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const updatedNote = { "_id": thisNote["_id"], "username": thisNote["username"], "content": thisNote["content"], "collection": collectionName };

      setNotes((prev) => {
        const newArray = [...prev];
        let indexToSplice;
        for (const noteIndex in newArray) {
          if (newArray[noteIndex]["_id"] === updatedNote["_id"]) {
            indexToSplice = noteIndex;
          }
        }
        newArray.splice(indexToSplice, 1);
        return newArray;
      });

      console.log(notes);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <button className="collection-btn" key={keyId} onClick={handleOnClick}>{collectionName}</button>
  )
}

export default MoveToCollectionBtn;