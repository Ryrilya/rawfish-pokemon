export class MoveRecord {
  accuracy: number;
  power: number;
  category: string;
  name: string;
  type: string;
  lvl?: number;
  tmNum?: number;
  trNum?: number;

  constructor(
    accuracy: number,
    power: number,
    category: string,
    name: string,
    type: string,
    lvl?: 0,
    tmNum?: 0,
    trNum?: 0,
  ){
    this.accuracy = accuracy;
    this.power = power;
    this.category = category;
    this.name = name;
    this.type = type;
    
    if(lvl) this.lvl = lvl;
    if(tmNum) this.tmNum = tmNum;
    if(trNum) this.trNum = trNum;
  }
}