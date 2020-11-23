import { nbmap } from '../diff-algorithm/diff_components/nbmap';
import { notebook } from '../diff-algorithm/nb_components/notebook';
import { Notebook } from './notebook';

export class DiffElement{
    old_notebook: string;
    new_notebook: string;
    mapping: string;

    constructor(old_notebook:Notebook,new_notebook:Notebook){
        this.old_notebook = old_notebook.context;
        this.new_notebook = new_notebook.context;

        
        let old_nt = new notebook(old_notebook.uri.fsPath);
        let new_nt = new notebook(new_notebook.uri.fsPath);

        let nd = new nbmap(old_nt,new_nt);
        nd.generate();
        this.mapping = nd.toMessage();
        
    }

}