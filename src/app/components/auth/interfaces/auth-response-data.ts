export interface AuthResponseData {
  jwt_token: string
  refresh_token: string
  id: string,
  email: string,
  expiresIn: string,
  expiresInRefresh: string
}
