import { notebook } from "./nb_components/notebook";
import { nbmap } from "./diff_components/nbmap";
import { line2line } from "./diff_components/line2line";
import { cell2cell } from "./diff_components/cell2cell";

export class nbdiff {
  old_notebook: notebook;
  new_notebook: notebook;
  nbmap!: nbmap;

  constructor(old_notebook: notebook, new_notebook: notebook) {
    this.old_notebook = old_notebook;
    if (!this.old_notebook.isGenerated) {
      this.old_notebook.generate();
    }
    this.new_notebook = new_notebook;
    if (!this.new_notebook.isGenerated) {
      this.new_notebook.generate();
    }
  }

  generate() {
    this.nbmap = new nbmap(this.old_notebook, this.new_notebook);
    this.nbmap.generate();
  }

  getCellMap(index: number): line2line[] {
    let filter_line2line = this.nbmap.linemap.filter(
      (x) => x.old_line.cell_index == index
    );
    return filter_line2line;
  }

  toJSON():string {
    var c2cl: cell2cell[] = [];
    for (var _i = 0; _i < this.old_notebook.cells.length; _i++) {
      var result = this.getCellMap(_i + 1);
      var new_cell_index = result.map((x) => x.new_line.cell_index);
      var unique_new_cell_index = new_cell_index.filter(
        (value, index) => new_cell_index.indexOf(value) == index
      ) as number[];
      var c2c = new cell2cell(_i + 1, unique_new_cell_index);
      c2cl.push(c2c);
    }
    return JSON.stringify(c2cl);
  }

}
