export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: User;
}
