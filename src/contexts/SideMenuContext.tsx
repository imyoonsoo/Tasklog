// context/SideMenuContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

const SideMenuContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function SideMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SideMenuContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
}

export const useSideMenu = () => useContext(SideMenuContext);
