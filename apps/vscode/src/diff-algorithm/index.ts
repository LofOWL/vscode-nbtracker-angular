
import {notebook} from "./nb_components/notebook";
import {nbdiff} from "./nbdiff";


let new_notebook = new notebook("./data/new.ipynb");

let old_notebook = new notebook("./data/old.ipynb");

let nd = new nbdiff(old_notebook,new_notebook);

nd.generate();

nd.toJSON();