import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Nav from "./Nav";
import SignInForm from "./SignIn";
import DashboardView from "./DashboardView";
import WritePage from "./WritePage";
import PageNotFound from "./PageNotFound";
import ProtectedRoute from "./ProtectedRoute";

const NavLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { index: true, element: <SignInForm /> },

      {
        path: "/user/:id",
        element: (
          <ProtectedRoute>
            <DashboardView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/:id/write",
        element: (
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export const App = () => <RouterProvider router={router} />;
export default App;
