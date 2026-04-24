import { create } from "zustand";
import useQuizStore from "./useQuizStore";

type UserProfile = {
  email: string;
  loginTime: string;
  isLoggedIn: boolean;
  userName: string;
  id: number;
};

type ModalType = "none" | "auth" | "createQuiz";
type AuthMode = "signin" | "signup";

type AuthStore = {
  userProfile: UserProfile | null;

  modal: ModalType;
  authMode: AuthMode;

  redirectAfterLogin: boolean;

  openAuth: (mode?: AuthMode, redirect?: boolean) => void;
  openCreateQuiz: () => void;
  closeModal: () => void;

  setUserProfile: (profile: UserProfile) => void;
  logout: () => void;
};

const loadProfile = (): UserProfile | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem("profile");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
};

const useAuthStore = create<AuthStore>((set) => ({
  userProfile: loadProfile(),

  modal: "none",
  authMode: "signin",

  redirectAfterLogin: false,

  openAuth: (mode = "signin", redirect = false) =>
    set({
      modal: "auth",
      authMode: mode,
      redirectAfterLogin: redirect,
    }),

  openCreateQuiz: () =>
    set({
      modal: "createQuiz",
    }),

  closeModal: () =>
    set({
      modal: "none",
      redirectAfterLogin: false,
    }),

  setUserProfile: (profile) =>
    set((state) => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("profile", JSON.stringify(profile));
      }

      if (state.redirectAfterLogin) {
        return {
          userProfile: profile,
          modal: "createQuiz",
          redirectAfterLogin: false,
        };
      }

      return {
        userProfile: profile,
        modal: "none",
        redirectAfterLogin: false,
      };
    }),

  logout: () => {
    if (typeof window !== "undefined") {
      useQuizStore.getState().clearForLogout();
      const keys = Object.keys(window.localStorage);
      for (const key of keys) {
        if (key === "quiz-storage") continue;
        window.localStorage.removeItem(key);
      }
    }
    set({
      userProfile: null,
      modal: "none",
      redirectAfterLogin: false,
    });
  },
}));

export default useAuthStore;
