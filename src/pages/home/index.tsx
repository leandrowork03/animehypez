import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { FaSearch } from "react-icons/fa";
import { LuPopcorn } from "react-icons/lu";
import { Link } from "react-router-dom";
import { TbRating18Plus } from "react-icons/tb"
import { IoMdAddCircleOutline } from "react-icons/io";
import { AnimeContext } from "../../contexts/animeContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export interface animeProps {
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
}

export function Home() {
  const{addItem} = useContext(AnimeContext)
  const [anime, setAnime] = useState<animeProps[]>([]);
  const [loading, setLoading] = useState(true);

  const List = async () => {
    try {
      const response = await fetch("https://api.jikan.moe/v4/anime");
      const data = await response.json();
      setAnime(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    List();
  }, []);

  if(loading){
    return(
    <Container>
      <main className="flex flex-col w-full h-screen items-center justify-center">
        <h1 className="font-black text-center text-2xl m-4 text-orange-600 text-3xl" style={{textShadow: " 5px 5px 5px black"}}>carregando ...</h1>
      </main>
    </Container>
    )
  }

  function adicionar(item:animeProps){
    toast.success('Anime add to your profile')
    addItem(item)
  }

  return (
      <div>
     <Container>
     <div className="pt-20">
       <section className=" p-4 rounded-lg max-w-3xl mx-auto flex justify-center items-center gap-2 " style={{backgroundColor:"rgba(0, 0, 0, 0.750)"}}>
        <input
          placeholder="Search"
          className="w-full border-2 rounded-lg h-9 px-3 outline-none bg-amber-50"
        />
        <button>
          <FaSearch size={25} color="white" />
        </button>
      </section>

      <h1 className="font-black text-center text-2xl m-4 text-orange-600 text-3xl" style={{textShadow: " 5px 5px 5px black"}}>
        Checkout our anime list
      </h1>

      <main className="grid  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 ">
       
        {anime.map((item) => {
          let proofNote;
          let age

          if (item.score > 8) {
            proofNote = (
              <strong className="text-green-500">{item.score}</strong>
            );
          } else if (item.score < 7) {
            proofNote = (
              <strong className="text-red-500">{item.score}</strong>
            );
          } else {
            proofNote = (
              <strong className="text-yellow-400">{item.score}</strong>
            );
          }

            if (item.rating) {
              const rating = item.rating.trim();
          
              if (rating === "R - 17+ (violence & profanity)") {
                age = <strong className="text-yellow-300">{rating}</strong>;
              } else if (rating === "PG-13 - Teens 13 or older") {
                age = <strong className="text-green-400">{rating}</strong>;
              } else if (rating === "PG - Children") {
                age = <strong className="text-blue-400">{rating}</strong>;
              } else if (rating === "R+ - Mild Nudity") {
                age = (
                  <div className="flex items-center gap-1 text-red-600">
                    <TbRating18Plus size={25} />
                    <strong>{rating}</strong>
                  </div>
                );
              } else {
                age = <strong>{rating}</strong>;
              }
            }

          return (
            <section
              className="px-4 bg-black text-white p-4 rounded-lg hover:scale-103 transition-all flex flex-col justify-around"
              key={item.mal_id}
            >
           <Link to={`/details/${item.mal_id}`}>
              <img
                src={item.images.jpg.image_url}
                alt={item.title}
                className="w-50 h-70 mx-auto mb-4 rounded-lg"
              />
              <p className="text-center font-black">click over to details</p>
            </Link>
              <div>
                <strong className="text-purple-500">{item.title}</strong>
                <b className="mx-1">/</b>
                <strong className="text-shadow-rose-400">{item.title_japanese}</strong>
              </div>
              <div className="flex items-center gap-2">
                <LuPopcorn />
                {proofNote}
              </div>
              <p className="text-xs">{age}</p>
              <hr className="my-1" />
              <strong>{item.status}</strong>
              <hr className="my-1" />
              <div className="flex gap-3 items-center">
                <p>Add to favorities? </p>
                <button className="hover:text-green-500" onClick={()=>adicionar(item)}><IoMdAddCircleOutline size={30}/></button>
              </div>
            </section>
          
          );
        })}
      </main>
     </div>
    </Container>
    <footer className="bg-zinc-900 text-white text-center py-4 mt-10">
  <p className="text-sm">
    © {new Date().getFullYear()} Desenvolvido por <strong>Leandro</strong> • Todos os direitos reservados.
  </p>
</footer>
   </div>
   
  );
}




