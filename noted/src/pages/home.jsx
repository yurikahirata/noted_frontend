import { useState, useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
import "../styles/home.css";
import Navbar from '../components/navbar';

const Home = ({ username, isHome, setIsHome }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setIsHome(true);
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
      <Navbar isHome={isHome} />
      <section className="input-section">
        <input type="text" className="main-input" placeholder="What're your thoughts?" autoFocus value={content} onChange={(e) => setContent(e.target.value)} onKeyUp={handleOnKeyUp} />
      </section >

    </main>
  )
}

export default Home;