export interface UpdateAccessToken {
  updateAccessToken: (id: string, token: string) => Promise<void>
}
