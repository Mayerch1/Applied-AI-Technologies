import { IUser } from '@entities';
import { pool } from '@dbConnection';
import { isNumber } from 'util';

export interface IUserDao {
  getOne: (email: string) => Promise<IUser | undefined>;
  getAll: () => Promise<IUser[] | void>;
  add: (user: IUser) => Promise<void>;
  update: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

export class UserDao implements IUserDao {
  /**
   * @param email:string
   * @param id:number
   */
  public async getOne(param: string|number): Promise<IUser | undefined> {
    var res;
    if (isNumber(param))
    {
        res = await pool<IUser>('users')
        .select()
        .where({
          id: param
        })
        .then(resp => {
          let res = resp[0];
          return res;
        })
        .catch(err => {
          console.log(err);
          return undefined;
        });
    }
    else{
          res = await pool<IUser>('users')
          .select()
          .where({
            email: param
          })
          .then(resp => {
            let res = resp[0];
            return res;
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
        let res = resp[0];
        return res;
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
    try {
      const res = await pool<IUser>('users')
        .select()
        .then(resp => {
          return resp;
        })
        .catch(err => {
          console.log(err);
        });
      return res;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param user
   */
  public async add(user: IUser): Promise<void> {
    try {
      pool<IUser>('users')
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
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param user
   */
  public async update(user: IUser): Promise<void> {
    try {
      pool<IUser>('users')
        .where({
          id: user.id
        })
        .update({
          surname: user.surname,
          name: user.name,
          email: user.email,
          apiToken: user.apiToken,
          chatID: user.chatID
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param id
   */
  public async delete(id: number): Promise<void> {
    try {
      pool<IUser>('users')
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
    } catch (error) {
      throw error;
    }
  }
}
