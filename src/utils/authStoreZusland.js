import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData, token: userData.token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "auth-storage" } // Saves to localStorage
  )
);

export default useAuthStore;
