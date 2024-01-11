import NewUserDTO from "@/model/UserDTO"
import { api } from "./api"

export default class UserApiService {

  public async registerUser(user: NewUserDTO) {

    try {
      const response = await api.post('/user', {
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone,
        role: user.role?.toString(),
        status: user.status
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

}