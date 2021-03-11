import {readFileSync} from "fs";
import { cell } from "./cell";

export class notebook {
  path: string;
  cells: Array<cell>;
  cells_length: number;
  lines: Array<string>;
  list_lines_length:number[];


  constructor(path: string) {
    this.path = path;
    this.cells_length = 0;
    this.cells = [];
    this.lines = [];
    this.list_lines_length = [];
  }

  generate() {
    const html = this.readNotebook();
    const obj = JSON.parse(html);
    this.cells_length = 0;
    obj["cells"].forEach((cell_ele: any, index: number) => {
      const new_cell = Object.assign(new cell(index + 1), cell_ele);
      new_cell.generate();
      this.cells.push(new_cell);
      this.lines = this.lines.concat(new_cell.getLineList());
      this.list_lines_length.push(new_cell.lines_length);
      this.cells_length ++;
    });
  }

  mapCell(index:number){
    for (const i = 0; i < this.list_lines_length.length; i++){
      if (index <= this.list_lines_length[i]){
        return [i+1,index];
      }else{
        index -= this.list_lines_length[i];
      }
    }
    return [-1,-1];
  }


  readNotebook() {
    const html = readFileSync(this.path, "utf-8");
    return html;
  }

  getCell(index:number):cell|undefined{
    return this.cells.find(x => x.index == index);
  }

  getContext():string[]{
    let result: string[] = [];
    for (const cell of this.cells){
      result = result.concat(cell.getLineList());
    }
    return result;
  }

}
