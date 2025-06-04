import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logodbz.png'
import { Input } from '../../components/input'
import { useState } from 'react'
import { Auth } from '../../services/firebaseConnections'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const schema = z.object({
  name: z
    .string()
    .nonempty("Nome é obrigatório")
    .max(14, "O nome deve ter no máximo 14 letras"),
  email: z.string().email("Digite um email válido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

type FormData = z.infer<typeof schema>

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleRegister(data: FormData) {
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(Auth, data.email, data.password)

      await updateProfile(userCredential.user, {
        displayName: data.name
      })

      navigate("/login")
    } catch (error) {
      console.error("Erro ao registrar:", error)
      alert("Erro ao registrar. Verifique os dados ou tente novamente.")
    }

    setLoading(false)
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-full h-screen">
        <div
          className="flex flex-col items-center gap-6 w-full max-w-md p-6 rounded-lg"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        >
          <Link to="/" className="mb-2">
            <img src={logoImg} alt="logo" className="w-40" />
          </Link>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
            <Input
              type="text"
              placeholder="Digite seu nome"
              name="name"
              error={errors.name?.message || ""}
              register={register}
              
            />

            <Input
              type="email"
              placeholder="Digite seu e-mail"
              name="email"
              error={errors.email?.message || ""}
              register={register}
            />

            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message || ""}
              register={register}
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md h-11 hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Registrar"}
            </button>

            <Link to="/login">
              <p className="text-white text-center">
                Já tem uma conta? <strong>Faça login</strong>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}
