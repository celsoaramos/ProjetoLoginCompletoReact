import UserApiService from "./UserApiService";
import { api } from "./api";


export default class AuthenticationService {

  public async login(email: string, password: string) {

    try {
      const response = await api.post('/user/login', {
        email,
        password,
      })

      if (response.status === 200) {

        return response.data
      } else {

        throw new Error(`Erro: ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }

  public async recoverPassword(email: string) {

    try {
      const response = await api.post('/user/recovery', {
        email,
      })

      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Erro: ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }

  public async changePassword(uuid: string, password: string) {

    try {
      const response = await api.post('/user/changePassword', {
        uuid,
        password
      })

      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Erro: ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }

  public async verifyToken() {

    try {
      const response = await api.post('/token')

      if (response.status === 200) {
        return response.data
      } else {
        throw new Error(`Erro: ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }

}