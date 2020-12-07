import {Notebook} from "./notebook";
import {DiffDecoder,line2line,cell2cell} from "./mapping";


class DiffElement{
    old_notebook:Notebook;
    new_notebook:Notebook;
    mapping:DiffDecoder;

    constructor(input:JSON){
      this.old_notebook = new Notebook(input["old_notebook"],"old");
      this.new_notebook = new Notebook(input["new_notebook"],"new");
      this.mapping = new DiffDecoder(input["mapping"]);
    }
  
  }


export {DiffElement,DiffDecoder,line2line,cell2cell};