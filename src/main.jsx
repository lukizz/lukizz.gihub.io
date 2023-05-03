import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    end: true
  },
  {
    path: "/playlist",
    element: <Playlist />,
    end: true
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);