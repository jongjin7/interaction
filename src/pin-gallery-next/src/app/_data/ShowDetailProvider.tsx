'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShowDetailContextType {
  showDetail: object | null;
  setShowDetail: React.Dispatch<React.SetStateAction<object | null>>;
}

export const ShowDetailContext = createContext<ShowDetailContextType | undefined>(undefined);

export const ShowDetailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showDetail, setShowDetail] = useState<object | null>(null);

  return <ShowDetailContext.Provider value={{ showDetail, setShowDetail }}>{children}</ShowDetailContext.Provider>;
};
