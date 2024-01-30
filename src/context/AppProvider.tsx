"use client";
import { AppContextOwn, User } from "@/types/global";
import storageData from "@/utils/storage";
import { createContext, useState } from "react";

const initialUserState: User = {
  name: "",
  email: "",
  token: "",
  role: "",
  id: "",
};
const AppContext = createContext<AppContextOwn>({
  user: initialUserState,
  setUser: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(
    storageData.getData("user") || initialUserState
  );
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
