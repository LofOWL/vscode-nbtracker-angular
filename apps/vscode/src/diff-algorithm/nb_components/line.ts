export class line {
  context!: string;
  index!: number;
  cell_index!:number;
  isEmpty!: boolean;

  constructor(context?: string, index?: number,cell_index?:number) {
    this.context = context ? context : "";
    this.index = index ? index : -1;
    this.cell_index = cell_index ? cell_index : -1;
    this.isEmpty = this.context.replace(/\s/g, "") == "" ? true : false;
  }

  public toString = (): string => {
    return `${this.cell_index} ${this.index} \n${this.context} \n${this.isEmpty}`;
  };
  
}
