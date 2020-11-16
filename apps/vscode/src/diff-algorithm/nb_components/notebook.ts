var fs = require("fs");
import { cell } from "./cell";
import { line } from "./line";

export class notebook {
  path: string;
  cells: Array<cell>;
  isGenerated!:boolean;

  constructor(path: string) {
    this.path = path;
    this.cells = [];
    this.isGenerated = false;
  }

  readNotebook() {
    const html = fs.readFileSync(this.path, "utf-8");
    return html;
  }

  getCell(index:number):cell|undefined{
    return this.cells.find(x => x.index == index);
  }

  getLines():line[]{
    let result:line[] = [];
    this.cells.forEach((value)=>{
      result = result.concat(value.lines);
    });
    return result;
  }

  generate() {
    const html = this.readNotebook();
    let obj = JSON.parse(html);
    obj["cells"].forEach((cell_ele, index) => {
      let new_cell = Object.assign(new cell(index + 1), cell_ele);
      new_cell.generate();
      this.cells.push(new_cell);
    });
    this.isGenerated = true;
  }

}
