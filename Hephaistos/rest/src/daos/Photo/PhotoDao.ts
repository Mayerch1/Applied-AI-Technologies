import { pool } from '@dbConnection';
import { IPhoto } from '../../entities/Photo';


export interface IPhotoDao {
  getOne: (id: number) => Promise<IPhoto | null>;
  add: (user: IPhoto) => Promise<void>;
}

export class PhotoDao implements IPhotoDao {
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
          userId: photo.userId
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
