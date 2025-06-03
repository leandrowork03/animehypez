// Header.tsx
import { Link } from 'react-router-dom';
import { CiLogin } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';

import logoImg from '../../assets/logodbz.png';
import { AuthContext } from '../../contexts/authContext';

export function Header() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  // Atualiza o avatar a partir do localStorage
  const loadAvatar = () => {
    const storedAvatar = localStorage.getItem("profileAvatar");
    setAvatar(storedAvatar || null);
  };

  useEffect(() => {
    loadAvatar();

    // Sempre que o localStorage for alterado em outra aba
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === "profileAvatar") {
        loadAvatar();
      }
    };

    // Sempre que voltar pra essa rota
    window.addEventListener("storage", onStorageChange);
    window.addEventListener("focus", loadAvatar);

    return () => {
      window.removeEventListener("storage", onStorageChange);
      window.removeEventListener("focus", loadAvatar);
    };
  }, []);

  return (
    <header className="bg-amber-500 w-full fixed px-4 z-50">
      <nav className="flex justify-between items-center h-15 max-w-7xl mx-auto py-4">
        <Link to="/">
          <img src={logoImg} alt="logo" className="w-20" />
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-black flex items-center gap-2"
        >
          <span className="hidden sm:inline truncate max-w-[120px]">
            {user?.name || user?.email}
          </span>

          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-9 h-9 rounded-full border-2 border-black object-cover"
            />
          ) : (
            <FaRegUserCircle size={35} />
          )}
        </button>
      </nav>

      {menuOpen && (
        <nav
          className="absolute right-3 mt-0 w-48 bg-white rounded shadow-lg text-black flex flex-col"
          role="menu"
          aria-label="Menu do usuário"
        >
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 bg-amber-500 hover:bg-orange-300"
            role="menuitem"
          >
            Perfil
          </Link>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 bg-amber-500 hover:bg-orange-300"
            role="menuitem"
          >
            Home
          </Link>
          <button
            className="bg-amber-500 px-4 py-2 text-left hover:bg-red-500 hover:text-white"
            type="button"
            onClick={async () => {
              await logout();
              setMenuOpen(false);
            }}
            role="menuitem"
          >
            <div className="flex items-center gap-2">
              <CiLogin />
              <span>Sair</span>
            </div>
          </button>
        </nav>
      )}
    </header>
  );
}
