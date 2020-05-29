export interface ILecture {
  id?: number;
  topic: string;
  profID?: number;
  slackID?: number;
}

export class Lecture implements ILecture {
  id?: number | undefined;
  topic: string;
  profID?: number;
  slackID?: number;
  constructor(id: number,topic?: string, profID?: number, slackID?: number) {
    this.id = id;
    this.topic = topic || '';
    this.profID = profID;
    this.slackID = slackID;
  }
}
