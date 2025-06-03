import { useState, useEffect, useContext, ChangeEvent } from "react";
import { Container } from "../../../components/container";
import { Panel } from "../../../components/panelheader";
import goku from '../../../assets/goku.jpg';
import luffy from '../../../assets/luffy.jpg';
import naruto from '../../../assets/naruto.jpg';
import { AuthContext } from "../../../contexts/authContext";

const avatars = [goku, luffy, naruto];

export function Edit() {
  const { user, setUser } = useContext(AuthContext);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);

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
    setUploadedAvatar(null); // Zera upload se escolher avatar padrão
    localStorage.setItem("profileAvatar", avatar);
    alert("Avatar salvo com sucesso!");
  }

  function handleUploadAvatar(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setUploadedAvatar(base64);
        setSelectedAvatar(base64);
        localStorage.setItem("profileAvatar", base64);
        alert("Avatar enviado e salvo com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSaveBio() {
    if (user?.uid) {
      localStorage.setItem(`bio_${user.uid}`, bio);
      setUser((prev) => prev ? { ...prev, bio } : prev);
      alert("Bio salva com sucesso!");
    }
  }

  function handleRemoveAvatar() {
    localStorage.removeItem("profileAvatar");
    setSelectedAvatar(null);
    setUploadedAvatar(null);
    alert("Avatar removido com sucesso!");
  }

  return (
    <Container>
      <Panel />

      <div className="mt-6">
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
          {uploadedAvatar && (
            <img
              src={uploadedAvatar}
              alt="Avatar enviado"
              className="w-20 h-20 rounded-full border-4 border-blue-500"
            />
          )}
        </div>

        <label className="block text-white font-bold mb-2 cursor-pointer">
          Enviar imagem personalizada:
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadAvatar}
            className="block mt-2 text-sm text-white"
          />
        </label>

        <button
          onClick={handleRemoveAvatar}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 mt-2"
        >
          Remover Avatar
        </button>

        <h2 className="text-white font-bold mb-2 text-xl mt-6">Sua bio:</h2>
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
      </div>
    </Container>
  );
}
