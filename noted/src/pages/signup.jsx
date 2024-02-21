import '../styles/signup.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Signup = ({ setUsername }) => {
  const [thisUsername, setThisUsername] = useState("");
  const [password, setPassword] = useState("");
  const [taken, setTaken] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState("");

  async function handleOnClick(e) {
    e.preventDefault();
    const body = { "username": thisUsername, "password": password };

    const regex = new RegExp('^[a-zA-Z0-9-.~\w]*$');
    if (regex.test(thisUsername)) {
      setIsLoading("Loading...");

      const result = await fetch(`${process.env.API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (result.status === 200) {
        setIsLoading("");
        setUsername(thisUsername);

        const folderBody = { "username": thisUsername, "collectionName": "unsorted" };
        fetch(`${process.env.API_URL}/collections`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(folderBody),
        });

        await login(thisUsername);
      }
      else {
        setIsLoading("");
        setTaken("sorry, that username is taken...");
      }
    } else {
      alert("hey bestie! \n\nusernames can only consists of these characters: \n\u2022alphanumeric character (a-zA-Z0-9)\n\u2022dash (-)\n\u2022underscore (_)\n\u2022tilde (~)\n\u2022period (.) \n\nthanks:)");
    }
  }

  return (
    <section className="section-content">
      <h1 className="title">s i g n u p</h1>
      <p>{isLoading}</p>
      <div>
        <form>
          <input type="text" placeholder='username' className="user-input" value={thisUsername} onChange={(e) => setThisUsername(e.target.value)} autoFocus />
          <p className="taken-username">{taken}</p>
          <input type="password" placeholder='password' className="user-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link className="a-btn">
            <button className="signup-btn" onClick={handleOnClick}>➜</button>
          </Link>
          <Link to="/" className="a-btn">
            <button className="back-btn">back</button>
          </Link>
        </form>
      </div>
    </section>
  )
}

export default Signup;