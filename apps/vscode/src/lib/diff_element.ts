import { lsc_diff_3 } from '../diff-algorithm/diff_components/lsc_diff_3';
import { notebook } from '../diff-algorithm/nb_components/notebook';
import { Notebook } from './notebook';

export class DiffElement{
    old_notebook: string;
    new_notebook: string;
    mapping: string;

    constructor(old_notebook:Notebook,new_notebook:Notebook){
        this.old_notebook = old_notebook.context;
        this.new_notebook = new_notebook.context;

        console.log("hello 234223oi 42io3 2io3 ");
        this.mapping = lsc_diff_3(new notebook(old_notebook.uri.fsPath),new notebook(new_notebook.uri.fsPath));
        console.log(this.mapping);
    }

}