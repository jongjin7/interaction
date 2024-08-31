'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface ShowDetailContextType {
  currentDetailLink: object | null;
  setCurrentDetailLink: React.Dispatch<React.SetStateAction<object | null>>;
}

export const ShowDetailContext = createContext<ShowDetailContextType | undefined>(undefined);

export const ShowDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentDetailLink, setCurrentDetailLink] = useState<object | null>(null);

  return (
    <ShowDetailContext.Provider value={{ currentDetailLink, setCurrentDetailLink }}>
      {children}
    </ShowDetailContext.Provider>
  );
};
