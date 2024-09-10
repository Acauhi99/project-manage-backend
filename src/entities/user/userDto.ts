export class UserRegisterDto {
  nome: string;
  email: string;
  senha: string;
  papel: string;

  constructor(nome: string, email: string, senha: string, papel: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.papel = papel;
  }
}

export class UserResponseDto {
  id: number;
  nome: string;
  email: string;
  papel: string;

  constructor(id: number, nome: string, email: string, papel: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.papel = papel;
  }
}
