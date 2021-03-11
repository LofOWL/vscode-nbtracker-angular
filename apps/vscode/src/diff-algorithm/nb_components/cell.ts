import { line } from "./line";

export class cell {
  index!: number;
  source!: [];
  cell_type!: string;
  lines: Array<line> = [];
  lines_length:number;
  
  constructor(index: number) {
    this.index = index;
    this.lines_length = 0;
  }

  generate() {
    this.source.forEach((value, index) => {
      const new_line: line = new line(value, index + 1,this.index);
      this.lines.push(new_line);
      this.lines_length ++;
    });
    return this.lines;
  }

  getType() {
    return this.cell_type;
  }

  getLine(index:number):line|undefined{
      return this.lines.find(x =>x.index == index+1);
  }

  getLineList():string[]{
    const line_list:string[] = [];
    for (const line_ele of this.lines){
      line_list.push(line_ele.context);
    }
    return line_list;
  }

  getContext():string{
    let context = "";
    for (const line_ele of this.lines){
      context += line_ele.context;
    }
    return context;
  }

  public toString = (): string => {
    let result = "";
    for (const line_ele of this.lines) {
      result += "" + this.index + " " + line_ele + " \n";
    }
    return result;
  };
}
