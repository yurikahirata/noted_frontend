import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { logout } = useAuth();

  function handleOnClick(e) {
    e.preventDefault();
    logout();
  }

  return (
    <section>
      <h1>What're your thoughts?</h1>
      <button onClick={handleOnClick}>Logout</button>
    </section>
  )
}

export default Home;