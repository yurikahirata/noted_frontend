import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import "../styles/notes.css";
import NoteContainer from '../components/noteContainer';

const Notes = ({ username, isHome, setIsHome, collections, collection, setCollection, setCollections, isCollectionsOpen, setIsCollectionsOpen }) => {
  const [notes, setNotes] = useState([]); // Notes in this collection
  const location = useLocation();

  useEffect(() => {
    (location.state && location.state.isCollectionsOpened === true) ? setIsCollectionsOpen(true) : null; // Check if collections was open before navigated
    setIsHome(false);
  }, [])

  return (
    <main className="notes">
      <p className="app-name">n o t e d .</p>
      <Navbar isHome={isHome} collections={collections} setCollection={setCollection} setCollections={setCollections} username={username} isCollectionsOpen={isCollectionsOpen} setIsCollectionsOpen={setIsCollectionsOpen} />
      <NoteContainer collection={collection} setCollection={setCollection} collections={collections} setCollections={setCollections} setIsHome={setIsHome} username={username} notes={notes} setNotes={setNotes} />
    </main>
  )
};

export default Notes;