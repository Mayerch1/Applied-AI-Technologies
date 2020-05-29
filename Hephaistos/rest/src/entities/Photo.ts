import { IUser } from './User';
import { v4 as uuid } from 'uuid';

export interface IPhoto {
  id?: number;
  orgfilename: string;
  userId: number;
  filename: string;
}

export class Photo implements IPhoto {
  id?: number;
  orgfilename: string;
  filename: string;
  userId: number;

  constructor(orgfilename?: string, user?: IUser, email?:string,filename?:string) {
    if (!user)
    {
      throw "No User";
    }
    if (!filename){
      this.filename = uuid() 
    }
    else{
      this.filename = filename 
    }

    if (email)
    {
      throw "not Implemented yet";
    }

    this.userId = user.id || 0; // nicht korrekt implementiert falls userId == undefined dann erst user speichern und laden
    this.orgfilename = orgfilename || ' ';
  }
}
