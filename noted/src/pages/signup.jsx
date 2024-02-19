import '../styles/signup.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [taken, setTaken] = useState("");
  const { login } = useAuth();

  async function handleOnClick(e) {
    e.preventDefault();
    const body = { "username": username, "password": password };

    const result = await fetch("http://localhost:8080/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (result.status === 200)
      await login({ username });
    else
      setTaken("sorry, that username is taken...");

  }

  return (
    <section className="section-content">
      <h1>s i g n u p</h1>
      <div>
        <form>
          <input type="text" placeholder='username' className="user-input" value={username} onChange={(e) => setUsername(e.target.value)} />
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