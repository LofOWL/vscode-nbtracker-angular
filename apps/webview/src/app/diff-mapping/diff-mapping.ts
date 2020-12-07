
export {Cell,DiffMapping}

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