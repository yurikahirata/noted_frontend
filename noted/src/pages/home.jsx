import { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
import "../styles/home.css";
import Navbar from '../components/navbar';

const Home = ({ username }) => {
  const [content, setContent] = useState("");
  // const { logout } = useAuth();

  function handleOnKeyUp(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      console.log("fetched?");
      const body = { username: username, content: content, collection: "unsorted" };
      console.log(body);
      fetch("http://localhost:8080/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      setContent("");
    }
  }

  // function handleOnClick(e) {
  //   e.preventDefault();
  //   logout();
  // }

  return (
    <main className="home">
      <Navbar />
      <section className="input-section">
        <input type="text" className="main-input" placeholder="What're your thoughts?" autoFocus value={content} onChange={(e) => setContent(e.target.value)} onKeyUp={handleOnKeyUp} />
        {/* <button onClick={handleOnClick}>Logout</button> */}
      </section >

    </main>
  )
}

export default Home;