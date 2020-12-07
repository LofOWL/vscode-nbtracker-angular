import { type } from 'os';

export {Notebook};


class Notebook{
    data:JSON;
    cells:Cell[];

    constructor(input:string,type:string){
      this.data = JSON.parse(input).cells;
      this.cells = [];
      JSON.parse(input)["cells"].forEach((cell,index) => {
        const cindex = index +1;
        this.cells.push({
            id: ""+cindex+"-"+type,
            cell_index: cindex,
            selected: true,
            element: undefined,
            cell_type: cell["cell_type"],
            source: cell["source"]
        });
      });
      
    }

    getHTMLElement(cell_index:number){
      return this.cells.find((value) => value.cell_index === cell_index);
    }
  
    getCellSource(index:number):JSON{
      return this.data[index-1].source;
    }
  
    getLineSource(cell_index:number,line_index:number):string{
      return this.getCellSource(cell_index)[line_index-1];
    }
  
    getCellsSource(indexs:number[]):JSON[]{
      var result = [];
      for (let index of indexs){
        result.push(this.getCellSource(index))
      }
      return result;
    }
  
  }


interface Cell{
    id: string;
    cell_index: number;
    selected: boolean;
    element: HTMLElement|undefined;
    cell_type: string;
    source: string[];
}
