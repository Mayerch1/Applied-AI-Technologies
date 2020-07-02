import { IUser } from '@entities';
import { pool } from '@dbConnection';
import { isNumber } from 'util';
import bcrypt from 'bcrypt';

export interface IUserDao {
  getOne: (email: string) => Promise<IUser | undefined>;
  getAll: () => Promise<IUser[] | void>;
  add: (user: IUser) => Promise<void>;
  changePassword: (email: string, password: string) => Promise<void>;
  updateApiToken: (email: string, apiToken: string) => Promise<void>;
  updatePackage: (email: string, packageId: number) => Promise<void>;
  updateLeftPictures: (email: string, date:Date ,leftPictures: number) => Promise<void>;
  updateChatId: (id: string|number, chatId: string) => Promise<void>;
  update: (email: string, name: string, surname: string) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class UserDao implements IUserDao {
  public async updatePackage(email: string, packageId: number): Promise<void> {
    var d = new Date();
    d.setDate(d.getDate()-1);
    return pool<IUser>('users')
      .where({
        email: email
      })
      .update({
        packageId: packageId,
        date: d
      });
  }

  public async updateLeftPictures(email: string, date:Date ,leftPictures: number): Promise<void> {
    return pool<IUser>('users')
      .where({
        email: email
      })
      .update({
        leftPictures: leftPictures,
        date: date
      });

  }
  /**
   * @param email:string
   * @param id:number
   */
  public async getOne(param: string | number): Promise<IUser | undefined> {
    var res;
    if (isNumber(param)) {
      res = await pool<IUser>('users')
        .select()
        .where({
          id: param
        })
        .then(resp => {
          return resp[0];
        })
        .catch(err => {
          console.log(err);
          return undefined;
        });
    }
    else {
      res = await pool<IUser>('users')
        .select()
        .where({
          email: param
        })
        .then(resp => {
          return resp[0];
        })
        .catch(err => {
          console.log(err);
          return undefined;
        });
    }
    return res;

  }


  /**
   * @param apiToken
   */
  public async checkApiToken(apiToken: string): Promise<IUser | undefined> {
    const res = await pool<IUser>('users')
      .select()
      .where({
        apiToken: apiToken
      })
      .then(resp => {
        return resp[0];
      })
      .catch(err => {
        console.log(err);
        return undefined;
      });
    return res;
  }

  /**
   *
   */
  public async getAll(): Promise<IUser[] | void> {

    const res = await pool<IUser>('users')
      .select()
      .then(resp => {
        return resp;
      })
      .catch(err => {
        console.log(err);
      });
    return res;

  }

  /**
   *
   * @param user
   */
  public async add(user: IUser): Promise<void> {
    return pool<IUser>('users')
      .insert({
        surname: user.surname,
        name: user.name,
        email: user.email
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

  }

  /**
   *
   * @param user
   */
  public async update(email: string, surname: string, name: string): Promise<void> {
    return pool<IUser>('users')
      .where({
        email: email
      })
      .update({
        surname: surname,
        name: name
      });
  }


  /**
   *
   * @param email
   * @param password
   */
  public async changePassword(email: string, password: string): Promise<void> {
    return pool<IUser>('users')
      .where({
        email: email
      })
      .update({
        pwdHash: await bcrypt.hash(password, 12)
      });

  }

  /**
 *
 * @param user
 */
  public async updateApiToken(email: string, apiToken: string): Promise<void> {
    return pool<IUser>('users')
      .where({
        email: email
      })
      .update({
        apiToken: apiToken
      });

  }

  /**
*
* @param user
*/
  public async updateChatId(id: string|number, chatId: string): Promise<void> {
    if (isNumber(id)) {
      return pool<IUser>('users')
      .where({
        id: id
      })
      .update({
        chatID: chatId
      });
    }

    return pool<IUser>('users')
      .where({
        email: id
      })
      .update({
        chatID: chatId
      });
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    return pool<IUser>('users')
      .where({
        id: id
      })
      .del()
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
