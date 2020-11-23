
import {notebook} from "./nb_components/notebook";
import {nbmap} from "./diff_components/nbmap";
import {DiffDecoder} from "./diff_decoder";

let new_notebook = new notebook("./data/new.ipynb");

let old_notebook = new notebook("./data/old.ipynb");

let nd = new nbmap(old_notebook,new_notebook);
nd.generate();

var ele = nd.toMessage();

let dd = new DiffDecoder(ele);

