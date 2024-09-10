export interface DecodedToken {
  id: number;
  email: string;
  exp: number;
}

export interface TokenResponse {
  token: string;
}
