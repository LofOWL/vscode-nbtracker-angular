import { line } from "../nb_components/line";

export class line2line {
  old_line: line;
  new_line: line;

  ratio: number;
  
  constructor(old_line: line, new_line: line, ratio: number) {
    this.old_line = old_line;
    this.new_line = new_line;
    this.ratio = ratio;
  }

  toList() {
    return [
      this.old_line.cell_index,
      this.old_line.index,
      this.new_line.cell_index ,
      this.new_line.index,
      this.ratio,
    ];
  }

  public toString = (): string => {
    return `${this.old_line} \n${this.new_line} \n${this.ratio}`;
  };
}
