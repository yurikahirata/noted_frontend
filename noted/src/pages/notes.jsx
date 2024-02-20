import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import "../styles/notes.css";
import Note from '../components/note';

const Notes = ({ username, isHome, setIsHome }) => {
  const [unsortedNotes, setUnsortedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState("");

  useEffect(() => {
    setIsHome(false);
    setIsLoading("Loading...");
    async function fetchNotes() {
      const notes = await fetch(`${process.env.API_URL}notes/${username}/unsorted`);
      const parsedNotes = await notes.json()
      setUnsortedNotes(parsedNotes);
      setIsLoading("");
    }

    fetchNotes();
  }, [])

  return (
    <main className="notes">
      <Navbar isHome={isHome} />
      <section className="notes-section">
        <h1 className="title">unsorted thoughts</h1>
        <p>{isLoading}</p>
        <div className="listed-notes">
          {unsortedNotes.map((note) => (
            <Note key={note["_id"]} note={note} unsortedNotes={unsortedNotes} setUnsortedNotes={setUnsortedNotes} />
          ))}
        </div>
      </section>
    </main>
  )
};

export default Notes;