import '../styles/login.css';
import { Form } from "react-router-dom";

export default function Login() {
  return (
    <section className="section-content">
      <h1>l o g i n</h1>
      <div>
        <Form>
          <input type="text" placeholder='username' className="user-input" />
          <input type="text" placeholder='password' className="user-input" />
          <button className="login-btn">➜</button>
        </Form>
      </div>
    </section>
  )
}