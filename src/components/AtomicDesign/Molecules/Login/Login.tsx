import React, { FormEvent, useState } from 'react'
import Button from '../../Atoms/Button'
import Input from '../../Atoms/Input'
import Label from '../../Atoms/Label'
import Icon from '../../Atoms/Icon'
import { validateEmail } from '@/components/Commons/CommonsLogin'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/contexts/AuthContext'
import UserApiService from '@/services/UserApiService'

interface LoginProps {
  setShowItem: (value: string) => void
}

const Login = ({ setShowItem }: LoginProps) => {

  const {
    login,
    setShowLogin,
  } = useAuthContext()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    if (!validateEmail(email)) {
      toast.error('Email inválido !')
      return
    }
    try {
      await login(email, password)
      setShowItem('')
      toast.success('Login realizado com sucesso !')
    } catch (e: any) {
      console.log(e.message)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setEmail(email)
  }

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value
    setPassword(newPassword)
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmitLogin(e)
    }
  }

  const goToRegister = () => {
    setShowItem('register')
    setShowLogin(false)
  }

  const goToForgetPassword = () => {
    setShowItem('forgetPassword')
    setShowLogin(false)
  }

  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <Label
          text="ENTRAR"
          textSize='three'
          fontWeight='bolder'
          color='text-gray-900'
        />
        <Label
          text="Preencha seu email e sua senha"
          textSize='medium'
          fontWeight='lighter'
          color='text-gray-600'
          className='block px-3 py-3'
        />
      </div>
      <div>
        <form onSubmit={handleSubmitLogin}>
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
                  idName="floating_email"
                  placeholder="email@dominio.com.br"
                  withBackground={false}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Label
                text="Senha"
                textSize='small'
                fontWeight='semibolder'
                color='text-gray-500'
                className='px-1'
              />
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <Icon
                    icon="mdi-lock-outline"
                    color="text-gray-400"
                    size="large"
                  />
                </div>
                <Input
                  type="password"
                  idName="floating_password"
                  placeholder="************"
                  withBackground={false}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Button
                type="text"
                label="Recuperar senha ?"
                textSize='small'
                fontWeight="semibolder"
                className=''
                onClick={goToForgetPassword}
              />
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Button
                type="default"
                label="CADASTRAR"
                textSize='medium'
                fontWeight="semibolder"
                className='block w-full max-w-xs mx-auto px-3 py-3'
                onClick={goToRegister}
              />
            </div>
            <div className="w-full px-3 mb-5">
              <Button
                type="submit"
                label="ENTRAR"
                textSize='medium'
                fontWeight="semibolder"
                className='block w-full max-w-xs mx-auto px-3 py-3'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login