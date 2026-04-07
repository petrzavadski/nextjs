export interface IUser {
  login: string | undefined;
  userData: { isFavorite: boolean };
  isAdmin: boolean;
}
