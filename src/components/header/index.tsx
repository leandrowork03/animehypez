// src/components/Header.tsx
import { Link } from 'react-router-dom'
import { CiLogin } from 'react-icons/ci'
import { FaRegUserCircle } from 'react-icons/fa'
import { useContext, useState } from 'react'

import logoImg from '../../assets/logodbz.png'
import { AuthContext } from '../../contexts/authContext'

export function Header() {
  const { user, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-amber-500 w-full fixed px-4 z-50">
      <nav className="flex justify-between items-center h-15 max-w-7xl mx-auto py-4">
        <Link to="/">
          <img src={logoImg} alt="logo" className="w-20" />
        </Link>

        <button onClick={() => setMenuOpen(!menuOpen)} className="text-black flex items-center gap-2">
          <span className="hidden sm:inline truncate max-w-[120px]">{user?.name || user?.email}</span>
          <FaRegUserCircle size={35} />
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
              await logout()
              setMenuOpen(false)
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
  )
}
