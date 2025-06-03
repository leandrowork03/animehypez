import logoImg from '../../assets/logodbz.png'
import { Link } from 'react-router-dom'
import { CiLogin } from "react-icons/ci";
import { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

export function Header() {
  const [login, setLogin] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-amber-500 w-full fixed px-4 z-50'>
      <nav className='flex justify-between items-center h-15 max-w-7xl mx-auto py-4'>
        <Link to='/'>
          <img src={logoImg} alt="logo" className='w-20' />
        </Link>

        {login ? (
          <button onClick={() => setMenuOpen(!menuOpen)} className='text-black'>
            <FaRegUserCircle size={35} />
          </button>
        ) : (
          <Link to="/login" className="flex gap-2 items-center text-black">
            <p>Faça o login</p>
            <FiLogIn size={25} />
          </Link>
        )}
      </nav>

      {menuOpen && login && (
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
            onClick={() => {
              setLogin(false);
              setMenuOpen(false);
            }}
            role="menuitem"
          >
            <div className="flex items-center gap-2">
              <CiLogin /> Sair
            </div>
          </button>
        </nav>
      )}
    </header>
  );
}
