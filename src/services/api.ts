import axios from 'axios'
import { destroyCookie } from 'nookies'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL,
})

api.interceptors.response.use(
  (response) => {
    // Se a resposta for bem sucedida, retorna a resposta original
    return response
  },
  (error) => {
    // Se ocorrer um erro de autenticação (401 Unauthorized), redireciona para a página de login
    if (error.response.status === 401) {
      api.defaults.headers.authorization = ''
      destroyCookie(null, 'nextauth.token')
      window.location.reload()
    }
    // Se ocorrer qualquer outro tipo de erro, retorna o erro original
    return Promise.reject(error)
  },
)
