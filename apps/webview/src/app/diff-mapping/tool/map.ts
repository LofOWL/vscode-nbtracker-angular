export {generate_map,Cell,DiffMapping};

function generate_map(parent) {
  parent.diffmapping = [];
  // tslint:disable-next-line: forin
  for (const cell2cell of parent.diff.mapping.cell2cells) {
    console.log(cell2cell);
    const old_id = parent.getId(cell2cell.old_cell_index, 'old');
    const old_notebook = document.getElementById(old_id);
    const old_cell: Cell = {
      id: old_id,
      selected: true,
      cell_index: cell2cell.old_cell_index,
      element: old_notebook,
    };
    const new_cells: Cell[] = [];
    for (const new_index of cell2cell.new_cell_indexs) {
      const new_id = parent.getId(new_index, 'new');
      const new_notebook = document.getElementById(new_id);
      new_cells.push({
        id: new_id,
        selected: true,
        cell_index: new_index,
        element: new_notebook,
      });
    }
    parent.diffmapping.push({
      old: old_cell,
      new: new_cells,
    });
  }
}


interface Cell{
    id: string;
    cell_index: number
    selected: boolean;
    element: HTMLElement;
}

interface DiffMapping{
    old: Cell;
    new: Cell[];
}
