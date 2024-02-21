import { Link } from "react-router-dom";
import '../styles/root.css';

export default function Root() {
  return (
    <section className="section-content">
      <h1>n o t e d .</h1>
      <div>
        <Link to="/login" className="a-btn">
          <button className="root-btn">login</button>
        </Link>
        <Link to="/signup" className="a-btn">
          <button className="root-btn">sign-up</button>
        </Link>
      </div>
    </section>
  )
}