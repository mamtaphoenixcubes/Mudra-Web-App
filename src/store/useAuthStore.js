import { create } from "zustand";
import { authService } from "../services/apiService";

const getInitialUser = () => {
  if (typeof window === "undefined") return null;

  const userStr =
    localStorage.getItem("user") || sessionStorage.getItem("user");

  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
};

const getInitialToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token")
  );
};

const getInitialRefreshToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken")
  );
};

const getInitialFirebaseToken = () => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("firebaseToken") ||
    sessionStorage.getItem("firebaseToken")
  );
};

export const useAuthStore = create((set) => ({
  user: getInitialUser(),

  token: getInitialToken(),

  refreshToken: getInitialRefreshToken(),

  firebaseToken: getInitialFirebaseToken(),

  isLoggedIn:
    typeof window !== "undefined"
      ? localStorage.getItem("isLoggedIn") === "true" ||
        sessionStorage.getItem("isLoggedIn") === "true"
      : false,

  loading: false,
  error: null,

  login: async (email, password, rememberMe = false) => {
    set({ loading: true, error: null });

    try {
      const response = await authService.login(email, password);

      if (response.success && response.data) {
        /**
         * Store the COMPLETE user object returned by API
         */
        const user = response.data.user;

        /**
         * Tokens returned by API
         */
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const firebaseToken = response.data.firebaseToken;

        /**
         * Choose storage based on Remember Me
         */
    
/**
 * Store login data in BOTH localStorage and sessionStorage
 */
[localStorage, sessionStorage].forEach((storage) => {
  storage.setItem("isLoggedIn", "true");
  storage.setItem("user", JSON.stringify(user));
  storage.setItem("token", token);
  storage.setItem("refreshToken", refreshToken);
  storage.setItem("firebaseToken", firebaseToken);
});


        /**
         * Update Zustand state
         */
        set({
          user,
          token,
          refreshToken,
          firebaseToken,
          isLoggedIn: true,
          loading: false,
          error: null,
        });

        /**
         * Notify components listening for storage changes
         */
        window.dispatchEvent(new Event("storage"));

        return true;
      }

      set({
        error: response.message || "Login failed",
        loading: false,
      });

      return false;
    } catch (error) {
      console.warn("AuthStore Login error:", error);

      const errMsg =
        error.response?.data?.message ||
        "Unable to connect to the server. Please check your credentials.";

      set({
        error: errMsg,
        loading: false,
      });

      return false;
    }
  },

  logout: () => {
    /**
     * Clear localStorage
     */
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("firebaseToken");

    /**
     * Clear sessionStorage
     */
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("firebaseToken");

    /**
     * Reset Zustand
     */
    set({
      user: null,
      token: null,
      refreshToken: null,
      firebaseToken: null,
      isLoggedIn: false,
      error: null,
    });

    window.dispatchEvent(new Event("storage"));
  },
}));

export default useAuthStore;