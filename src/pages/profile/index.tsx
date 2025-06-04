import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/container";
import { Panel } from "../../components/panelheader";
import { AuthContext } from "../../contexts/authContext";
import { AnimeContext } from "../../contexts/animeContext";
import type { animeProps } from "../home";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import empty from '../../assets/empty.jpg'

export function Profile() {
  const { removeItem, animez } = useContext(AnimeContext);
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    const storedAvatar = localStorage.getItem("profileAvatar");
    setAvatar(storedAvatar || null);

    if (user?.uid) {
      const storedBio = localStorage.getItem(`bio_${user.uid}`);
      if (storedBio) {
        setBio(storedBio);
      }
    }
  }, [user]);

  function remover(item: animeProps) {
    toast.error("Anime removed");
    removeItem(item);
  }

  return (
    <Container>
      <Panel />
      <div className="p-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}>
        <header className="text-white w-full flex flex-col items-start gap-3 border-b border-white pb-4">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-2 border-white"
            />
          ) : (
            <img src={empty} alt="" className="w-24 h-24 rounded-full border-2 border-white"/>
          )}
          <h2 className="font-black text-2xl">
            {user?.name
              ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
              : "Wellcome"}
          </h2>
        </header>

        {bio && (
          <div className="mt-5 max-w-xs">
            <h2 className="text-white text-2xl">Bio</h2>
            <p className="text-white mt-1 italic">{bio}</p>
          </div>
        )}
<main>
  <div className="mt-15">
    <h1 className="text-2xl font-black text-white">My favorities animes</h1>
  </div>

  {animez.length === 0 ? (
    <p className="text-white italic mt-4">Nothing has added yet.</p>
  ) : (
    animez.map((item) => (
      <div
        className="flex items-center justify-around py-10"
        key={item.mal_id}
      >
        <img
          src={item.images.jpg.image_url}
          alt={item.title}
          className="h-20 w-20 rounded-full"
        />
        <p className="text-white font-black wrap">{item.title}</p>

        <button
          className="text-white hover:text-red-600"
          onClick={() => remover(item)}
        >
          <IoMdRemoveCircleOutline size={30} />
        </button>
      </div>
    ))
  )}
</main>
      </div>
    </Container>
  );
}
