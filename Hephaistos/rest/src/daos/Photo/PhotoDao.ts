import { pool } from '@dbConnection';
import { IPhoto } from '@entities';
import { User } from 'node-telegram-bot-api';


export interface IPhotoDao {
  getOne: (id: number) => Promise<IPhoto | null>;
  add: (user: IPhoto) => Promise<void>;
}

export class PhotoDao implements IPhotoDao {
  public async revokeLastByChatId(id: string) {
     return pool<IPhoto>('photos').join<User>('users', 'users.id', '=', 'photos.userID').where('users.chatID', '=',  id).andWhere('photos.result' ,'=', '0').orderBy('photos.id', 'DESC').limit(1).select('photos.id').then((value) =>{
      return pool<IPhoto>('photos').where({
        id: value[0].id
      }).update({
        userReject: true
      });

     });
  }
  /**
   * @param id
   */
  public async getOne(id: number): Promise<IPhoto | null> {
    console.log('getOne');
    const res = await pool<IPhoto>('photos')
      .select()
      .where({
        id: id
      })
      .then(resp => {
        let res = resp[0];
        return res;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
    return res;
  }
  /**
   *
   * @param user
   */
  public async add(photo: IPhoto): Promise<void> {
    try {
      pool<IPhoto>('photos')
        .insert({
          filename: photo.filename,
          orgfilename: photo.orgfilename,
          userId: photo.userId,
          result: photo.result,
          userReject: photo.userReject
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
}
