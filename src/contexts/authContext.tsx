// src/contexts/authContext.tsx
import { createContext, useState, useEffect} from 'react'
import type { ReactNode } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Auth } from '../services/firebaseConnections'

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  uid: string
  name: string | null
  email: string | null
}

interface AuthContextData {
  signed: boolean
  loadingAuth: boolean
  user: UserProps | null
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(Auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
