import RoleEnum from "./enum/RoleEnum"

export default class UserDTO {

  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
    public role?: RoleEnum,
    public phone?: string,
    public status?: string,
    public uuid?: string,
  ) { }

  public static fromJson(json: any): UserDTO {
    return new UserDTO(
      json.name,
      json.email,
      json.password,
      json.role,
      json.phone,
      json.status,
      json.uuid,
    )
  }

  public toJson(): any {
    return {
      name: this.name || '',
      email: this.email || '',
      password: this.password || '',
      role: this.role || '',
      phone: this.phone || '',
      status: this.status || '',
      uuid: this.uuid || '',
    }
  }
}