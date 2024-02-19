import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import "../styles/notes.css";
import Note from '../components/note';

const Notes = ({ username }) => {
  const [unsortedNotes, setUnsortedNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      console.log(username);
      const notes = await fetch(`http://localhost:8080/notes/${username}/unsorted`);
      const parsedNotes = await notes.json()
      setUnsortedNotes(parsedNotes);
    }

    fetchNotes();
  }, [])

  return (
    <main className="notes">
      <Navbar />
      <section className="notes-section">
        <h1>unsorted thoughts</h1>
        <div className="listed-notes">
          {unsortedNotes.map((note) => (
            <Note key={note["_id"]} note={note} />
          ))}
        </div>
      </section>
    </main>
  )
};

export default Notes;