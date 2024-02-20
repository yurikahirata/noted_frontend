import { useState, useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
import "../styles/home.css";
import Navbar from '../components/navbar';

const Home = ({ username, isHome, setIsHome, collections, setCollections, collection, setCollection }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchCollections() {
      const results = await fetch(`${process.env.API_URL}collections/${username}`);
      const parsedResults = await results.json();

      setCollections(parsedResults);
    }

    fetchCollections();
    setIsHome(true);
    setCollection("unsorted");
  }, [])

  function handleOnKeyUp(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      const body = { username: username, content: content, collection: "unsorted" };
      fetch(`${process.env.API_URL}notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      setContent("");
    }
  }

  return (
    <main className="home">
      <p className="app-name">n o t e d .</p>
      <Navbar isHome={isHome} collections={collections} setCollection={setCollection} setCollections={setCollections} username={username} />
      <section className="input-section">
        <input type="text" className="main-input" placeholder="What're your thoughts?" autoFocus value={content} onChange={(e) => setContent(e.target.value)} onKeyUp={handleOnKeyUp} />
      </section >

    </main>
  )
}

export default Home;