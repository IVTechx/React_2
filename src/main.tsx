import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// Components
import App from "./App.tsx";
import ProtectedRoute from "./components/features/auth/ProtectedRoute.tsx";
// Pages
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import PassQuiz from "./components/pages/PassQuiz";
import QuizDetail from "./components/pages/QuizDetail";
import NotFound from "./components/pages/NotFound";
import Results from "./components/features/quiz/Results";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "search", element: <Search /> },
          { path: "passquiz", element: <PassQuiz /> },
          { path: "quiz", element: <QuizDetail /> },
          { path: "results", element: <Results /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
