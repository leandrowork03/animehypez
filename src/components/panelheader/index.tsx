import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { Auth } from '../../services/firebaseConnections';

export function Panel(){

  async function handleLogout(){
    await signOut(Auth);
  }


  return(
    <div className="w-full items-center flex h-14 sm:h-10 bg-blue-600 rounded-lg text-white font-medium gap-4 px-4 mb-4 mt-4">
      <Link to="/profile">
        Perfil
      </Link>
      <Link to="/profile/edit">
        editar
      </Link>
      <Link to='/'>
      Animes
      </Link>

      <button className="ml-auto"  onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  )
}

