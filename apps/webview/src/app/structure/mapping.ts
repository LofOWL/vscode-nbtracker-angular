
export{DiffDecoder,line2line,cell2cell};

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
          console.log(i);
            var i_s = i.split(",").map((x) => Number(x));
            this.line2lines.push({
              old_cell_index: i_s[0],
              old_index: i_s[1],
              new_cell_index: i_s[2],
              new_index: i_s[3],
              ratio: i_s[4]
            });
            if (this.old_cell_length < i_s[0]) this.old_cell_length = i_s[0]   
        }

        this.cell2cells = [];
        for (var _i = 0; _i <= this.old_cell_length; _i++) {
            var result = this.mapline(_i + 1);
            var new_cell_index = result.map((x) => x.new_cell_index);
            var unique_new_cell_index = new_cell_index.filter(
              (value, index) => new_cell_index.indexOf(value) === index && value !== -1
            ) as number[];
            this.cell2cells.push({
              old_cell_index: _i+1,
              new_cell_indexs: unique_new_cell_index
            });
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


interface cell2cell{
    old_cell_index:number;
    new_cell_indexs:number[];


}

interface line2line{
    old_index: number;
    new_index: number;
    old_cell_index: number;
    new_cell_index: number;
    ratio:number;


    
}