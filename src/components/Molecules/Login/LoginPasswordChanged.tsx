import React, { FormEvent, useState } from 'react'
import Button from '../../Atoms/Button'
import Icon from '../../Atoms/Icon'
import Input from '../../Atoms/Input'
import Label from '../../Atoms/Label'
import { delay } from '@/components/Commons/Commons'
import { validatePassword } from '@/components/Commons/CommonsLogin'
import email from 'next-auth/providers/email'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/contexts/AuthContext'
import UserApiService from '@/services/UserApiService'

interface LoginProps {
  setShowItem: (value: string) => void
  email: string
}

const LoginPasswordChanged = ({ setShowItem, email }: LoginProps) => {

  const {
    user,
    login,
  } = useAuthContext()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const userApiService = new UserApiService()

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value
    setPassword(newPassword)
  }

  const handleConfirmPasswordChange = (e: any) => {
    const newConfirmPassword = e.target.value
    setConfirmPassword(newConfirmPassword)
  }


  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validatePassword(password, confirmPassword)) {
      return
    }

    try {

      const userUUID = user?.uuid || ''
      userApiService.changePassword(userUUID, password)
      toast.success(`Senha alterada com sucesso.`)
      setShowItem('login')
      await login(email, password)

    } catch (error: any) {
      toast.error(error.response.data.message)
      delay(2000)
    }
  }

  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <Label
          text="TROCAR SENHA"
          textSize='three'
          fontWeight='bolder'
          color='text-gray-900'
        />
        <Label
          text="Informe uma nova senha"
          textSize='medium'
          fontWeight='lighter'
          color='text-gray-600'
          className='px-3 py-3'
        />
      </div>
      <div>
        <form onSubmit={changePassword}>
          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-5">
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
                  idName="password"
                  placeholder="************"
                  value={password}
                  withBackground={true}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="w-1/2 px-3 mb-5">
              <Label
                text="Confirmação de senha"
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
                  idName="confirmPassword"
                  placeholder="************"
                  value={confirmPassword}
                  withBackground={true}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
          </div>

          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Button
                type="submit"
                label="TROCAR SENHA"
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

export default LoginPasswordChanged