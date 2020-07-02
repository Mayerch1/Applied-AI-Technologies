import { IUser } from './User';
import { v4 as uuid } from 'uuid';

export interface IPhoto {
  id?: number;
  orgfilename: string;
  userId: number;
  filename: string;
  result: boolean;
  userReject: boolean;
}

export class Photo implements IPhoto {
  id?: number;
  orgfilename: string;
  filename: string;
  userId: number;
  result: boolean;
  userReject: boolean;

  constructor(orgfilename?: string, user?: IUser, email?:string,filename?:string, result?:boolean, userReject?: boolean) {
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
    this.result = result || false;
    this.userReject = userReject || false;
  }
}
