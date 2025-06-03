import type { ReactNode } from "react";
import type { animeProps } from "../pages/home";
import { createContext, useState } from "react";

interface animeContextData{
    animez: anymeProps[],
    animeGt:number,
    addItem: (item:animeProps)=>void,
    removeItem:(item:animeProps)=>void,
}

interface anymeProps {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  title: string;
  title_japanese: string;
  episodes: number;
  status: string;
  rating: string;
  score: number;
  synopsis:string
  amount: number
}

interface animeContextProps{
    children: ReactNode
}

export const AnimeContext = createContext({} as animeContextData)

export default function AnimeProvider({children}:animeContextProps){
    const [animez, setAnimez] = useState<anymeProps[]>([])

  function addItem(item: animeProps) {
  const alreadyExists = animez.some(e => e.mal_id === item.mal_id);

  if (alreadyExists) return;

  const newItem: anymeProps = {
    ...item,
    amount: 1,
  };

  setAnimez([...animez, newItem]);
}


    function removeItem(item: animeProps){
    const filteredAnimez = animez.filter((e) => e.mal_id !== item.mal_id);
        setAnimez(filteredAnimez);
        
    }


    return(
        <AnimeContext.Provider value={{animez, addItem, removeItem, animeGt: animez.length}}>
            {children}
        </AnimeContext.Provider>
    )
}