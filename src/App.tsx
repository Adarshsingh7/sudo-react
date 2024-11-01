import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import DashboardLayout from "./pages/DashboardLayout";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import { DashboardPage } from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <div className="h-screen">Home</div>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "home",
        element: <DashboardPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
