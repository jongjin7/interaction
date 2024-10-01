'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface ShowDetailContextType {
  currentDetailLink: string | null; // null 허용
  setCurrentDetailLink: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ShowDetailContext = createContext<ShowDetailContextType | undefined>(undefined);

export const ShowDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDetailLink, setCurrentDetailLink] = useState<string | null>(null);

  return (
    <ShowDetailContext.Provider value={{ currentDetailLink, setCurrentDetailLink }}>
      {children}
    </ShowDetailContext.Provider>
  );
};
