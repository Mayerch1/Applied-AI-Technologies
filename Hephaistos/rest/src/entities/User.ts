export enum UserRoles {
  Standard,
  Admin
}

type TUserRoles = UserRoles.Standard | UserRoles.Admin;

export interface IUser {
  id?: number;
  surname: string;
  name: string;
  role: TUserRoles;
  email: string;
  pwdHash: string;
}
export class User implements IUser {
  id?: number;
  surname: string;
  name: string;
  role: TUserRoles;
  email: string;
  pwdHash: string;
  constructor(nameOrUser?: string | IUser, surname?: string, email?: string, role?: TUserRoles, pwdHash?: string) {
    if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
      this.name = nameOrUser || '';
      this.surname = surname || '';
      this.email = email || '';
      this.role = role || UserRoles.Standard;
      this.pwdHash = pwdHash || '';
    } else {
      this.name = nameOrUser.name;
      this.surname = nameOrUser.surname;
      this.email = nameOrUser.email;
      this.role = nameOrUser.role;
      this.pwdHash = nameOrUser.pwdHash;
    }
  }
}
