import { delay, validateEmail } from '@/components/Commons/CommonsLogin'
import React, { FormEvent, useState } from 'react'
import Button from '../../Atoms/Button'
import Icon from '../../Atoms/Icon'
import Input from '../../Atoms/Input'
import Label from '../../Atoms/Label'
import toast from 'react-hot-toast'
import UserApiService from '@/services/UserApiService'
import { useAuthContext } from '@/contexts/AuthContext'

interface LoginProps {
  setShowItem: (value: string) => void
}

const LoginForgetPassword = ({ setShowItem }: LoginProps) => {

  const {
    setShowLogin,
  } = useAuthContext()
  const [email, setEmail] = useState('')

  const userApiService = new UserApiService()

  const goToLogin = () => {
    setShowItem('login')
    setShowLogin(true)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setEmail(email)
  }

  const forgetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      toast.error('Email inválido !')
    } else {

      try {

        await userApiService.recoverPassword(email)
        toast.success(
          'Uma nova senha foi enviada para o seu email.\n\nPor favor, verifique sua caixa de entrada e spam.',
          {
            duration: 6000,
          },
        )
        delay(3000)
        setShowItem('login')

      } catch (error: any) {
        toast.error('error', error.response.data.message)
      }
    }
  }


  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <Label
          text="RECUPERAR SENHA"
          textSize='three'
          fontWeight='bolder'
          color='text-gray-900'
        />
        <Label
          text="Informe seu email"
          textSize='medium'
          fontWeight='lighter'
          color='text-gray-600'
          className='px-3 py-3'
        />
      </div>
      <div>
        <form onSubmit={forgetPassword}>
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Label
                text="Email"
                textSize='small'
                fontWeight='semibolder'
                color='text-gray-500'
                className='px-1'
              />
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <Icon
                    icon="mdi-email-outline"
                    color="text-gray-400"
                    size="large"
                  />
                </div>
                <Input
                  type="email"
                  idName="registerEmail"
                  placeholder="seunome@exemplo.com"
                  value={email}
                  withBackground={true}
                  onChange={handleEmailChange}
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Button
                type="default"
                label="VOLTAR"
                textSize='medium'
                fontWeight="semibolder"
                onClick={goToLogin}
              />
            </div>
            <div className="w-full px-3 mb-5">
              <Button
                type="submit"
                label="ENVIAR"
                textSize='medium'
                fontWeight="semibolder"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForgetPassword