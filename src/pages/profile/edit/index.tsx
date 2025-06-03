
//profile/edit
import { useState, useEffect, useContext } from "react";
import { Container } from "../../../components/container";
import { Panel } from "../../../components/panelheader";
import goku from '../../../assets/goku.jpg'
import luffy from '../../../assets/luffy.jpg'
import naruto from '../../../assets/naruto.jpg'
import { AuthContext } from "../../../contexts/authContext";

const avatars = [goku, luffy, naruto];

export function Edit() {
  const { user, setUser } = useContext(AuthContext);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    const savedAvatar = localStorage.getItem("profileAvatar");
    const savedBio = user?.uid ? localStorage.getItem(`bio_${user.uid}`) : "";
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    }
    if (savedBio) {
      setBio(savedBio);
    }
  }, [user]);

  function handleSelectAvatar(avatar: string) {
    setSelectedAvatar(avatar);
    localStorage.setItem("profileAvatar", avatar);
    alert("Avatar salvo com sucesso!");
  }

  function handleSaveBio() {
    if (user?.uid) {
      localStorage.setItem(`bio_${user.uid}`, bio);
      setUser((prev) => prev ? { ...prev, bio } : prev);
      alert("Bio salva com sucesso!");
    }
  }

  return (
    <Container>
      <Panel />
      <h2 className="text-white font-bold mb-4 text-xl">Escolha seu avatar:</h2>
      <div className="flex gap-4 mb-6">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            onClick={() => handleSelectAvatar(avatar)}
            className={`w-20 h-20 rounded-full cursor-pointer border-4 ${
              selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
            }`}
          />
        ))}
      </div>

      <h2 className="text-white font-bold mb-2 text-xl">Sua bio:</h2>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Escreva algo sobre você..."
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 mb-4"
        rows={4}
      ></textarea>
      <button
        onClick={handleSaveBio}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
      >
        Salvar Bio
      </button>
    </Container>
  );
}
