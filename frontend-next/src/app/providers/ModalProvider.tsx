"use client";

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  modal: string | null;
  setModal: (modal: string | null) => void;
}

const ModalContext = createContext<ModalContextType>({
  modal: null,
  setModal: () => {},
});

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
} 