import React, { FormEvent, useState } from 'react'
import Button from '../../Atoms/Button'
import Input from '../../Atoms/Input'
import Label from '../../Atoms/Label'
import Icon from '../../Atoms/Icon'
import { useAuthContext } from '@/contexts/AuthContext'
import { validateEmail, validatePassword } from '@/components/Commons/CommonsLogin'
import toast from 'react-hot-toast'
import RoleEnum from '@/model/enum/RoleEnum'
import UserDTO from '@/model/UserDTO'
import UserApiService from '@/services/UserApiService'
import Phone from '../../Atoms/Phone'

interface LoginProps {
  setShowItem: (value: string) => void
}

const LoginRegister = ({ setShowItem }: LoginProps) => {

  const {
    setShowLogin,
  } = useAuthContext()
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [professionalNumber, setProfessionalNumber] = useState('')
  const [clinicName, setClinicName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const userApiService = new UserApiService()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setEmail(email)
  }

  const handleClinicNameChange = (e: any) => {
    const clinicName = e.target.value
    setClinicName(clinicName)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneChange = e.target.value.replace(/\D/g, '')
    setPhone(phoneChange)
  }

  const handleUserNameChange = (e: any) => {
    const userName = e.target.value
    setUserName(userName)
  }

  const handleProfessionalNumberChange = (e: any) => {
    const professionalNumber = e.target.value
    setProfessionalNumber(professionalNumber)
  }

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value
    setPassword(newPassword)
  }

  const handleConfirmPasswordChange = (e: any) => {
    const newConfirmPassword = e.target.value
    setConfirmPassword(newConfirmPassword)
  }

  const validateClinicName = (name: string) => {
    if (name.length < 5) {
      return false
    }
    return true
  }

  const validateCellNumber = (cellNumber: string) => {
    if (cellNumber.length < 11) {
      return false
    }
    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateClinicName(clinicName)) {
      toast.error('O nome da clínica deve ter ao menos 3 caracteres.')
      return
    }

    if (!validateCellNumber(phone)) {
      toast.error('Número de celular incompleto.')
      return
    }

    if (!validateEmail(email)) {
      toast.error('Email inválido.')
      return
    }

    const isPasswordValid = validatePassword(password, confirmPassword)

    if (!isPasswordValid) {
      return
    }

    await register()
  }

  async function register() {

    const role = RoleEnum.PROFISSIONAL

    const newUser = new UserDTO(
      userName,
      email,
      password,
      role,
      phone,
      'Ativo',
      clinicName,
      professionalNumber
    )

    try {

      await userApiService.registerUser(newUser)

      toast.success(`Cadastro realizado com sucesso.`)
      setShowItem('login')

    } catch (error: any) {
      toast.error('Ocorreu um erro')
    }
  }

  const goToLogin = () => {
    setShowItem('login')
    setShowLogin(true)
  }
  
  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <Label
          text="CADASTRAR"
          textSize='three'
          fontWeight='bolder'
          color='text-gray-900'
        />
        <Label
          text="Preencha as informações abaixo"
          textSize='medium'
          fontWeight='lighter'
          color='text-gray-600'
          className='px-3 py-3'
        />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-5">
              <Label
                text="Nome"
                textSize='small'
                fontWeight='semibolder'
                color='text-gray-500'
                className='px-1'
              />
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <Icon
                    icon="mdi-account-outline"
                    color="text-gray-400"
                    size="large"
                  />
                </div>
                <Input
                  type="text"
                  idName="registerName"
                  placeholder="nome completo"
                  value={userName}
                  withBackground={true}
                  onChange={handleUserNameChange}
                  required={true}
                />
              </div>
            </div>
            <div className="w-1/2 px-3 mb-5">
              <Label
                text="CRP / CRM"
                textSize='small'
                fontWeight='semibolder'
                color='text-gray-500'
                className='px-1'
              />
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <Icon
                    icon="mdi-content-paste"
                    color="text-gray-400"
                    size="large"
                  />
                </div>
                <Input
                  type="text"
                  idName="registerProfessionalNumber"
                  placeholder=""
                  value={professionalNumber}
                  withBackground={true}
                  onChange={handleProfessionalNumberChange}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Label
                text="Nome da Clínica"
                textSize='small'
                fontWeight='semibolder'
                color='text-gray-500'
                className='px-1'
              />
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <Icon
                    icon="mdi-heart-box-outline"
                    color="text-gray-400"
                    size="large"
                  />
                </div>
                <Input
                  type="text"
                  idName="registerClinicName"
                  placeholder="nome da sua clínica"
                  value={clinicName}
                  withBackground={true}
                  onChange={handleClinicNameChange}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="flex -mx-3">
            <div className="w-full px-3 mb-5">
              <Label
                text="Celular"
                textSize='small'
                fontWeight='semibolder'
                color='text-gray-500'
                className='px-1'
              />
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <Icon
                    icon="mdi-heart-box-outline"
                    color="text-gray-400"
                    size="large"
                  />
                </div>
                <Phone
                  idName="registerCellphone"
                  mask='(99) 99999-9999'
                  placeholder="(21) 99999-9999"
                  value={phone}
                  withBackground={true}
                  onChange={handlePhoneChange}
                  required={true}
                />
              </div>
            </div>
          </div>
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
                  idName="registerPassword"
                  placeholder="************"
                  value={password}
                  withBackground={true}
                  onChange={handlePasswordChange}
                  required={true}
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
                  idName="registerConfirmPassword"
                  placeholder="************"
                  value={confirmPassword}
                  withBackground={true}
                  onChange={handleConfirmPasswordChange}
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
                label="SALVAR"
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

export default LoginRegister