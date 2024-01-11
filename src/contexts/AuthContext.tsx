import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import UserDTO from '@/model/UserDTO'
import AuthenticationService from '@/services/AuthenticationService'
import UserApiService from '@/services/UserApiService'

interface AuthContextProviderProps {
  children: ReactNode
}

type AuthContextType = {
  user: UserDTO | undefined
  loggedIn: boolean
  showLogin: boolean
  passwordChanged: boolean
  logout: () => Promise<void>
  internalLogout: () => void
  login: (email: string, password: string) => Promise<void>
  setShowLogin: (show: boolean) => void
}

const AuthContextProvider = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProviderProps) {

  const [user, setUser] = useState<UserDTO | undefined>(undefined)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)

  const authApiService = new AuthenticationService()

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      // if no address - logout
      api.defaults.headers.authorization = `Bearer ${token}`
    } else {
      internalLogout()
    }
  }, [])

  async function login(email: string, password: string) {

    try {
      const response = await authApiService.login(email, password)
      const { token } = response

      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`

        setCookie(undefined, 'nextauth.token', token, {
          maxAge: 24 * 60 * 60 * 1, // 24 hour
        })

        console.log('3')
        setLoggedIn(true)
        setShowLogin(false)
      }

    } catch (error: any) {
      toast.error(error.response.data.message)
      internalLogout()
    }

  }


  function internalLogout() {
    api.defaults.headers.authorization = ''
    destroyCookie(null, 'nextauth.token')
    setLoggedIn(false)
    setUser(undefined)
    setShowLogin(true)
  }

  async function logout() {
    api.get('/auth/logout').catch(() => {
      console.log('not logged in')
    })
    api.defaults.headers.authorization = ''
    destroyCookie(null, 'nextauth.token')
    setLoggedIn(false)
    setUser(undefined)
    setShowLogin(true)
    // window.location.reload()
  }

  return (
    <AuthContextProvider.Provider
      value={{
        user,
        loggedIn,
        showLogin,
        passwordChanged,
        logout,
        internalLogout,
        login,
        setShowLogin,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContextProvider)
