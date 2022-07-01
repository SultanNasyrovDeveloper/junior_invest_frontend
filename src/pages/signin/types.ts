

export interface IAuthCredentials {
  username: string;
  password: string;
}

export interface ITokenPairResponse {
  access: string;
  refresh: string;
  user: object;
}

