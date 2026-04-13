import { createContext, useState, type ReactNode, useContext } from "react";

export interface Person {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  isLoggedIn: boolean;
  currentUser: Person | null;
  handleLogin: (userData: Person) => void;
  handleLogout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Person | null>(() => {
    const session = sessionStorage.getItem("active_session");
    return session ? JSON.parse(session) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(currentUser !== null);

  const handleLogin = (userData: Person) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("active_session", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("active_session");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, currentUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within <UserProvider>.");
  }

  return context;
};
