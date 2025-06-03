import type { RegisterOptions, UseFormRegister } from "react-hook-form"

interface inputProps{
    type: string
    placeholder: string
    name:string
    rules: RegisterOptions
    error:string
    register: UseFormRegister<any>
}

export function Input({type, placeholder, name,register,rules,error}:inputProps){
    return(
        <div>
            <input
            className="w-full bg-white border-2 rounded-md h-11 px-2 outline-none"
            type={type}
            placeholder={placeholder}
            id={name}
            {...register(name, rules)}
            />
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}

