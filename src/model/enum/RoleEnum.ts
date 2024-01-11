export default class RoleEnum {

  static PROFISSIONAL = new RoleEnum("PROFISSIONAL") // nome sugestivo
  static PACIENTES = new RoleEnum("PACIENTES") // nome sugestivo
  static BACKOFFICE = new RoleEnum("BACKOFFICE") // caso o (a) profissonal deseja delegar (secretária por exemplo)
  static SUPORTE = new RoleEnum("SUPORTE") // somos nós

  private constructor(private value: string) {}

  toString() {
    return this.value;
  }
}