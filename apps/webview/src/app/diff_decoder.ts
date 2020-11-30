
export {DiffElement,DiffDecoder,line2line,cell2cell};

class DiffElement{
    old_notebook:Notebook;
    new_notebook:Notebook;
    mapping:DiffDecoder;

    constructor(input:JSON){
      this.old_notebook = new Notebook(input["old_notebook"]);
      this.new_notebook = new Notebook(input["new_notebook"]);
      this.mapping = new DiffDecoder(input["mapping"]);
    }
  
  }

class Notebook{
  data:JSON;
  constructor(input:string){
    this.data = JSON.parse(input).cells;
    
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

class DiffDecoder{

    message:string;
    line2lines:line2line[];
    cell2cells:cell2cell[];
    old_cell_length: number;

    constructor(message:string){
        this.message = JSON.parse(message);

        this.line2lines = [];
        this.old_cell_length = 0;
        for (let i of this.message){
            var i_s = i.split(",").map((x) => Number(x));
            this.line2lines.push(new line2line(i_s[0],i_s[1],i_s[2],i_s[3],i_s[4]));
            if (this.old_cell_length < i_s[0]) this.old_cell_length = i_s[0]   
        }

        this.cell2cells = [];
        for (var _i = 0; _i <= this.old_cell_length; _i++) {
            var result = this.mapline(_i + 1);
            var new_cell_index = result.map((x) => x.new_cell_index);
            var unique_new_cell_index = new_cell_index.filter(
              (value, index) => new_cell_index.indexOf(value) == index && value != -1
            ) as number[];
            this.cell2cells.push(new cell2cell(_i + 1, unique_new_cell_index));
          }


        
    }

    mapline(index: number): line2line[] {
        return this.line2lines.filter(
            (x) => x.old_cell_index === index
          );
    }

    getline2line(cell_index:number,line_index:number,type:string):line2line{
      if (type === "new"){
        return this.line2lines.find((x) => x.new_cell_index === cell_index && x.new_index === line_index);
      }else{
        return this.line2lines.find((x) => x.old_cell_index === cell_index && x.old_index === line_index);
      }
      
    }

    mapcell(index:number):cell2cell|undefined{
        return this.cell2cells.find((x)=> x.old_cell_index === index);
    }


}

class cell2cell{
    old_cell_index:number;
    new_cell_indexs:number[];

    constructor(old_cell:number,new_cell:number[]){
        this.old_cell_index = old_cell;
        this.new_cell_indexs = new_cell;
    }
}


class line2line{
    old_index: number;
    new_index: number;
    old_cell_index: number;
    new_cell_index: number;
    ratio:number;

    constructor(old_cell_index:number,old_index:number,new_cell_index:number,new_index:number,ratio:number){
        this.old_index = old_index;
        this.new_index = new_index;
        this.old_cell_index = old_cell_index;
        this.new_cell_index = new_cell_index;
        this.ratio = ratio;
    }

    
}