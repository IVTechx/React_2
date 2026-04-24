import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";

// Layout & UI
import Header from "./components/layout/Header";
import GlobalModal from "./components/ui/GlobalModal";

// State
import useQuizStore from "./store/useQuizStore";

export default function App() {
  const location = useLocation();
  const loadDefaultQuizzes = useQuizStore((state) => state.loadDefaultQuizzes);

  useEffect(() => {
    loadDefaultQuizzes();
  }, [loadDefaultQuizzes]);

  const showHeader = location.pathname === "/";

  return (
    <div className="page">
      <GlobalModal />
      {showHeader ? <Header /> : null}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
