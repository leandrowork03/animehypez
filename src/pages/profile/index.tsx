import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { Panel } from "../../components/panelheader";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export function Profile() {
    const { user } = useContext(AuthContext)
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("profileAvatar");
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
  }, []);

  return (
    <Container>
        <Panel/>
    <div className="p-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
       <header className="text-white w-full flex flex-col border-b border-white">

           {avatar ? (
        <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
      ) : (
        <p className="text-white">Nenhum avatar selecionado</p>
      )}
      <h2 className="font-black text-2xl">
  {user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}
</h2>
       </header>
    </div>
    </Container>
  );
}

