import React from 'react';
import ReactDOM from 'react-dom/client';
// import Root from './pages/root.jsx';
// import Login from './pages/login.jsx';
// import Signup from './pages/signup.jsx';
// import Home from './pages/home.jsx';
import App from './App';
import { BrowserRouter } from "react-router-dom";
// import './App.css'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//   },
//   {
//     path: "login",
//     element: <Login />,
//   },
//   {
//     path: "signup",
//     element: <Signup />
//   },
//   {
//     path: "home",
//     element: <Home />
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
)
