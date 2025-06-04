import { useParams } from "react-router-dom"
import { Container } from "../../components/container"
import type { animeProps } from "../home"
import { useEffect, useState } from "react"
import { LuPopcorn } from "react-icons/lu"
import { TbRating18Plus } from "react-icons/tb"
import { IoMdAddCircleOutline } from "react-icons/io";
import { useContext } from "react"
import { AnimeContext } from "../../contexts/animeContext"
import toast from "react-hot-toast"

export function Details() {
  const {addItem} = useContext(AnimeContext)
  const [anime, setAnime] = useState<animeProps>()
  const [loading, setLoading] = useState(true)
  const { mal_id } = useParams()

  useEffect(() => {
    const List = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
        const data = await response.json();
        setAnime(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Something went wrong");
        setLoading(false);
      }
    };
    List()
  }, [mal_id]);

  function adicionar(anime:animeProps){
    toast.success('Add to your favs')
    addItem(anime)
  }

  let proofNote;
  let age;

  if (anime?.score !== undefined) {
    if (anime.score > 8) {
      proofNote = <strong className="text-green-500">{anime.score}</strong>;
    } else if (anime.score < 7) {
      proofNote = <strong className="text-red-500">{anime.score}</strong>;
    } else {
      proofNote = <strong className="text-yellow-400">{anime.score}</strong>;
    }
  }

  if (anime?.rating) {
    const rating = anime.rating.trim();

    if (rating === "R - 17+ (violence & profanity)") {
      age = <strong className="text-yellow-300">{rating}</strong>;
    } else if (rating === "PG-13 - Teens 13 or older") {
      age = <strong className="text-green-400">{rating}</strong>;
    } else if (rating === "PG - Children") {
      age = <strong className="text-blue-400">{rating}</strong>;
    } else if (rating === "R+ - Mild Nudity") {
      age = (
        <div className="flex items-center gap-1 justify-center text-red-600">
          <TbRating18Plus size={25} />
          <strong>{rating}</strong>
        </div>
      );
    } else {
      age = <strong>{rating}</strong>;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-black  text-white">
      <Container>
        {loading && <p className="text-center py-10">Carregando...</p>}

        {anime && (
          <div className="flex flex-col md:flex-row gap-4 py-10">
            <div className="flex-1 text-center bg-black py-10 w-full h-fit rounded-lg">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="h-100 w-full object-contain"
              />

              <div className="my-4 space-y-2">
                <p>Status: <strong>{anime.status}</strong></p>
                <p>Rating: {age}</p>
                <div className="flex items-center justify-center gap-1">
                  <LuPopcorn />
                  <p>Nota: {proofNote}</p>
                </div>
              </div>
            </div>

            <div className="w-full flex-1">
              <h1 className="text-2xl font-bold">{anime.title}</h1>
              <h2 className="text-lg italic mb-2">{anime.title_japanese}</h2>
              <p className="py-5">{anime.synopsis}</p>
             <div className="flex items-center gap-3">
               <h2 className="text-2xl font-black">Add to your favs</h2>
              <button 
              onClick={()=>adicionar(anime)}
              className="hover:text-green-500">
                <IoMdAddCircleOutline size={30}/>
              </button>
             </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
