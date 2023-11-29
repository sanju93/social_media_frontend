import NavBar from "./components/NavBar.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AddFriends from "./pages/AddFriends/AddFriends.jsx";
import Profile from "./pages/profile/profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path : '/profile',
          element : <Profile/>
        },
        {
          path : '/AddFriends',
          element : <AddFriends/>
        }
      ],
    },
  ]);

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
