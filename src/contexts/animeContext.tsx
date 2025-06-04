import type { ReactNode } from "react";
import type { animeProps as AnimePropsOriginal } from "../pages/home";
import { createContext, useState } from "react";

// Extendendo o tipo original para incluir 'amount'
export interface AnimeProps extends AnimePropsOriginal {
  amount: number;
}

interface AnimeContextData {
  animez: AnimeProps[];
  animeGt: number;
  addItem: (item: AnimePropsOriginal) => void;
  removeItem: (item: AnimePropsOriginal) => void;
}

interface AnimeContextProps {
  children: ReactNode;
}

export const AnimeContext = createContext({} as AnimeContextData);

export default function AnimeProvider({ children }: AnimeContextProps) {
  const [animez, setAnimez] = useState<AnimeProps[]>([]);

  function addItem(item: AnimePropsOriginal) {
    const alreadyExists = animez.some(e => e.mal_id === item.mal_id);
    if (alreadyExists) return;

    const newItem: AnimeProps = {
      ...item,
      amount: 1,
    };

    setAnimez([...animez, newItem]);
  }

  function removeItem(item: AnimePropsOriginal) {
    const filteredAnimez = animez.filter(e => e.mal_id !== item.mal_id);
    setAnimez(filteredAnimez);
  }

  return (
    <AnimeContext.Provider value={{ animez, addItem, removeItem, animeGt: animez.length }}>
      {children}
    </AnimeContext.Provider>
  );
}
