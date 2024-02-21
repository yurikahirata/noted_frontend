import '../styles/login.css';
import { useState } from 'react';
import { Form, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Login = ({ setUsername }) => {
  const [thisUsername, setThisUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState("");
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState("");

  async function handleOnClick(e) {
    e.preventDefault();
    const body = { "username": thisUsername, "password": password };

    setIsLoggingIn("Loading...");
    try {
      const result = await fetch(`${process.env.API_URL}/users/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (result.status === 200) {
        setUsername(thisUsername);
        setIsLoggingIn("");
        await login(thisUsername);
      }
      else {
        setIncorrect("something's incorrect...");
        setIsLoggingIn("");
      }
    } catch (e) {
      setIsLoggingIn("something went wrong...");
    }
  }
  return (
    <section className="section-content">
      <h1 className="title">l o g i n</h1>
      <p>{isLoggingIn}</p>
      <div>
        <form>
          <input type="text" placeholder='username' className="user-input" value={thisUsername} onChange={(e) => setThisUsername(e.target.value)} autoFocus />
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