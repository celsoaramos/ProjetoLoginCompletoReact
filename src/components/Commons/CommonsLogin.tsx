import { useAuthContext } from "@/contexts/AuthContext"
import { FormEvent } from "react"
import toast from "react-hot-toast"


function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

const validateEmail = (inputEmail: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailPattern.test(inputEmail)
}

const validatePassword = (
  newPassword: string,
  newConfirmPassword: string,
) => {
  const minLength = 8

  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

  if (newPassword !== newConfirmPassword) {
    toast.error(`Senha e confirmação de senha são diferentes.`)
    return false
  }

  if (newPassword.length < minLength) {
    toast.error(`Senha precisa ter ao menos ${minLength} caracteres.`)
    return false
  }

  if (!RegExp(passwordPattern).exec(newPassword)) {
    toast.error(
      'Senha inválida.\n\nSenha deve ter ao menos um número, uma letra maiúscula e uma letra minúscula.',
      {
        duration: 6000,
      },
    )
    return false
  }

  return true
}


export { delay, validateEmail, validatePassword }
