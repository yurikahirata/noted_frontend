import '../styles/root.css';


export default function Root() {
  return (
    <section className="section-content">
      <h1>n o t e d .</h1>
      <div>
        <a href={`/login`} className="a-btn">
          <button className="root-btn">login</button>
        </a>
        {/* <Link to="/signup">
          <button className="root-btn">sign-up</button>
        </Link> */}
      </div>
    </section>
  )
}