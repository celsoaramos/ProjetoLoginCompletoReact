import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface AuthContextProviderProps {
  children: ReactNode
}

type User = {
  id: string
  address: string
  username: string | undefined
  email: string | undefined
  password: string | undefined
  clinicName: string
  role: 'user' | 'operator' | 'admin'
  created_at: Date
  updated_at: Date
}

type AuthContextType = {
  user: User | undefined
  loggedIn: boolean
  showLogin: boolean
  passwordChanged: boolean
  logout: () => Promise<void>
  internalLogout: () => void
  updateUserProfile: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  setShowLogin: (show: boolean) => void
}

const AuthContextProvider = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      // if no address - logout
      api.defaults.headers.authorization = `Bearer ${token}`
      api
        .get('/profile')
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user)
            setLoggedIn(true)
          }
        })
        .catch(() => {
          internalLogout()
        })
    } else {
      internalLogout()
    }
  }, [])

  async function login(email: string, password: string) {
    await api
      .post('/auth/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          const { token } = response.data
          if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`
            api.get('/auth/verify-token').then((response) => {
              if (response.status === 200) {
                setCookie(undefined, 'nextauth.token', token, {
                  maxAge: 24 * 60 * 60 * 1, // 24 hour
                })

                getProfile()
              }
            })
          }
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message)
        internalLogout()
      })
  }

  function getProfile() {
    api
      .get('/profile')
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user)
          if (response.data.user.change_password) {
            setPasswordChanged(true)
          } else {
            setLoggedIn(true)
            setShowLogin(false)
          }
        }
      })
      .catch(() => {
        internalLogout()
      })
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

  function internalLogout() {
    api.defaults.headers.authorization = ''
    destroyCookie(null, 'nextauth.token')
    setLoggedIn(false)
    setUser(undefined)
    setShowLogin(true)
  }

  async function updateUserProfile() {
    await api
      .get('/profile')
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user)
          setLoggedIn(true)
        }
      })
      .catch(() => {
        internalLogout()
      })
  }
 
  const authContextValue = useMemo(() => ({
    user,
    loggedIn,
    showLogin,
    passwordChanged,
    logout,
    internalLogout,
    updateUserProfile,
    login,
    setShowLogin,
  }), [user, loggedIn, showLogin, passwordChanged, logout, internalLogout, updateUserProfile, login, setShowLogin]);

  return (
    <AuthContextProvider.Provider value={authContextValue}>
      {children}
    </AuthContextProvider.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContextProvider)
