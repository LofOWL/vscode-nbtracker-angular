import { line } from "./line";

export class cell {
  index!: number;
  source!: [];
  cell_type!: string;
  lines: Array<line> = [];
  
  constructor(index: number) {
    this.index = index;
  }

  generate() {
    this.source.forEach((value, index) => {
      let new_line: line = new line(value, index + 1,this.index);
      this.lines.push(new_line);
    });
    return this.lines;
  }

  getType() {
    return this.cell_type;
  }

  getLine(index:number):line|undefined{
      return this.lines.find(x =>x.index == index+1);
  }

  getLineList():string[]|undefined{
    var line_list:string[] = [];
    for (let line_ele of this.lines){
      line_list.push(line_ele.context);
    }
    return line_list;
  }

  public toString = (): string => {
    var result: string = "";
    for (let line_ele of this.lines) {
      result += "" + this.index + " " + line_ele + " \n";
    }
    return result;
  };
}
