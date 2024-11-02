import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import DashboardLayout from "./pages/DashboardLayout";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import Product from "./pages/Product";
import AuthFormComponent from "./pages/AuthPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "login",
    element: <AuthFormComponent />,
  },
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
      {
        path: "product",
        element: <Product />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <RouterProvider router={router} />{" "}
    </QueryClientProvider>
  );
}

export default App;
