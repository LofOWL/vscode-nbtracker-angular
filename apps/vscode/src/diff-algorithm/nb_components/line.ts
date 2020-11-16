export class line {
  context!: string;
  index!: number;
  cell_index!:number;
  isEmpty!: boolean;
  constructor(context: string, index: number,cell_inex:number) {
    this.context = context;
    this.index = index;
    this.cell_index = cell_inex;
    this.isEmpty = this.context.replace(/\s/g, "") == "" ? true : false;
  }

  public toString = (): string => {
    return `${this.cell_index} ${this.index} \n${this.context} \n${this.isEmpty}`;
  };
}
