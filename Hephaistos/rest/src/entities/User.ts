export enum UserRoles {
  Standard,
  Admin
}

type TUserRoles = UserRoles.Standard | UserRoles.Admin;

export interface IUser {
  id?: number;
  surname: string;
  name: string;
  chatID: string;
  apiToken: string | undefined;
  role: TUserRoles;
  email: string;
  pwdHash: string;
  packageId: number;
  date: Date;
  leftPictures: number;
}
export class User implements IUser {
  id?: number;
  surname: string;
  name: string;
  chatID: string;
  apiToken: string | undefined;
  role: TUserRoles;
  date: Date;
  packageId: number;
  leftPictures: number;
  email: string;
  pwdHash: string;
  constructor(nameOrUser?: string | IUser, surname?: string, email?: string, role?: TUserRoles, pwdHash?: string, chatID?: string, apiToken?: string, date?: Date,packageId?: number, leftPictures?: number) {
    if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
      var dt = new Date();
      dt.setDate(dt.getDate() -1);
      this.name = nameOrUser || '';
      this.surname = surname || '';
      this.email = email || '';
      this.role = role || UserRoles.Standard;
      this.pwdHash = pwdHash || '';
      this.chatID = chatID || '';
      this.apiToken = apiToken || '';
      this.date = date || dt;
      this.packageId = packageId || 0;
      this.leftPictures = leftPictures || 0;
    } else {
      this.name = nameOrUser.name;
      this.surname = nameOrUser.surname;
      this.email = nameOrUser.email;
      this.role = nameOrUser.role;
      this.pwdHash = nameOrUser.pwdHash;
      this.chatID = nameOrUser.chatID;
      this.apiToken = nameOrUser.apiToken;
      this.date = nameOrUser.date;
      this.packageId = nameOrUser.packageId;
      this.leftPictures = nameOrUser.leftPictures;
    }
  }
}
