import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import "../styles/notes.css";
import NoteContainer from '../components/noteContainer';

const Notes = ({ username, isHome, setIsHome, collections, collection, setCollection }) => {
  const [notes, setNotes] = useState([]);

  return (
    <main className="notes">
      <p className="app-name">n o t e d .</p>
      <Navbar isHome={isHome} collections={collections} setCollection={setCollection} username={username} />
      <NoteContainer collection={collection} setIsHome={setIsHome} username={username} notes={notes} setNotes={setNotes} />
    </main>
  )
};

export default Notes;