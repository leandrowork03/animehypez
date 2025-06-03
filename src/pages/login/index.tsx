import logoImg from '../../assets/logodbz.png'
import { Input } from '../../components/input'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Auth } from '../../services/firebaseConnections'
import { signInWithEmailAndPassword } from 'firebase/auth'

const schema = z.object({
  email: z.string().email("Digite um email válido").nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(data: FormData) {
    setLoading(true)

    try {
      await signInWithEmailAndPassword(Auth, data.email, data.password)
      navigate("/") // Redireciona após login
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      alert("Erro ao fazer login. Verifique suas credenciais.")
    }

    setLoading(false)
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-full h-screen">
        <div
          className="flex flex-col items-center gap-6 w-full max-w-md p-6 rounded-lg"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
        >
          <Link to="/" className="mb-2">
            <img src={logoImg} alt="logo" className="w-40" />
          </Link>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(handleLogin)}>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              error={errors.email?.message}
              register={register}
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md h-11 hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
            </button>

            <Link to="/register">
              <p className="text-white text-center">
                Ainda não tem conta? <strong>Registre-se agora</strong>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}
