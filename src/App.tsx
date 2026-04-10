import "./App.css";
import SignInForm from "./components/SignIn";
import DashboardView from "./components/DashboardView";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="app">
      <Nav />
      <SignInForm />
      <DashboardView />
    </div>
  );
};

export default App;
