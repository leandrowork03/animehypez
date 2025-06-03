import { useState, useEffect } from "react";
import { Container } from "../../../components/container";
import { Panel } from "../../../components/panelheader";
import goku from '../../../assets/goku.jpg'
import luffy from '../../../assets/luffy.jpg'
import naruto from '../../../assets/naruto.jpg'
import { Input } from "../../../components/input";

const avatars = [goku, luffy, naruto];



export function Edit() {
    const [bio,setbio]  = useState()
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("profileAvatar");
    if (savedAvatar) {
      setSelectedAvatar(savedAvatar);
    }
  }, []);

  function handleSelectAvatar(avatar: string) {
    setSelectedAvatar(avatar);
    localStorage.setItem("profileAvatar", avatar);
    alert("Avatar salvo com sucesso!");
  }

  return (
    <>
      <Container>
        <Panel />
        <h2 className="text-white font-bold mb-4 text-xl">Escolha seu avatar:</h2>
        <div className="flex gap-4">
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


      </Container>
    </>
  );
}


