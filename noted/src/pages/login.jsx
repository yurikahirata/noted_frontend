import '../styles/login.css';
import { useState } from 'react';
import { Form, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState("");
  const { login } = useAuth();

  async function handleOnClick(e) {
    e.preventDefault();
    const body = { "username": username, "password": password };

    const result = await fetch("http://localhost:8080/users/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (result.status === 200)
      await login(username);
    else
      setIncorrect("something's incorrect...");

  }
  return (
    <section className="section-content">
      <h1>l o g i n</h1>
      <div>
        <form>
          <input type="text" placeholder='username' className="user-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder='password' className="user-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link className="a-btn">
            <button className="login-btn" onClick={handleOnClick}>➜</button>
          </Link>
          <Link to="/" className="a-btn">
            <button className="back-btn">back</button>
          </Link>
        </form>
        <p className="incorrect-input">{incorrect}</p>
      </div>
    </section>
  )
}

export default Login;