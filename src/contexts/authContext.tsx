// src/contexts/authContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Auth } from '../services/firebaseConnections'

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  uid: string
  name: string | null
  email: string | null
  bio?: string
}

interface AuthContextData {
  signed: boolean
  loadingAuth: boolean
  user: UserProps | null
  logout: () => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>> // <-- expor setUser
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(Auth, (firebaseUser) => {
      if (firebaseUser) {
        // ao carregar o usuário, já busca bio do localStorage se existir
        const savedBio = localStorage.getItem(`bio_${firebaseUser.uid}`) || undefined

        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          bio: savedBio,
        })
      } else {
        setUser(null)
      }
      setLoadingAuth(false)
    })

    return () => unsub()
  }, [])

  async function logout() {
    await signOut(Auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
        user,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

