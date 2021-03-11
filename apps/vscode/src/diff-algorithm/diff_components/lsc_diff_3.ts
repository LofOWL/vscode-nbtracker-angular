import {diffArrays} from 'diff';
import {notebook} from "../nb_components/notebook";
import {compareTwoStrings} from "string-similarity";


export function lsc_diff_3(old_notebook:notebook,new_notebook:notebook){
    old_notebook.generate();
    new_notebook.generate();

    const result = diffArrays(old_notebook.getContext(),new_notebook.getContext());
    let old_index = 1; let new_index = 1;
    let identical_map:Array<[number,number]> = [];
    let old_mod:number[] = []; let new_mod:number[] = [];
    const block_list:Array<[number[],number[]]> = [];
    let old_miss:number[] = []; let new_miss:number[] = [];

    result.forEach((value)=>{
        if (value.added){
            const new_current = Array(value.count).fill(0).map((e,i) => (i+new_index))
            new_mod = new_mod.concat(new_current);
            new_miss = new_miss.concat(new_current);
            new_index += Number(value.count);
        }else if(value.removed){
            const old_current = Array(value.count).fill(0).map((e,i) => (i+old_index))
            old_mod = old_mod.concat(old_current);
            old_miss = old_miss.concat(old_current);
            old_index += Number(value.count);
        }else{
            identical_map = identical_map.concat(Array(value.count).fill(0).map((e,i) => [i+old_index,i+new_index]));
            old_index += Number(value.count);
            new_index += Number(value.count);
            block_list.push([old_mod,new_mod]);
            old_mod = []; new_mod = [];
        }
    });
    block_list.push([old_mod,new_mod]);

    const sim_matrix:number[][] = old_miss.map((old_index) => 
        new_miss.map((new_index) => {
            const old_context = old_notebook.lines[old_index-1];
            const new_context = new_notebook.lines[new_index-1];
            if (old_context !== undefined && new_context !== undefined){
                return compareTwoStrings(old_context,new_context);
            }
            return 0;
        }
    ));
    
    const mod_map:Array<[number,number,number]> = [];
    sim_matrix.forEach((value,old_index) => {
        const max_pro = Math.max(...value);
        if (max_pro > 0.5){
            const new_index = value.indexOf(Math.max(...value));
            const old_i = old_miss[old_index]; const new_i = new_miss[new_index];
            delete old_miss[old_index]; delete new_miss[new_index];
            mod_map.push([old_i,new_i,max_pro === 1 ? 0.99999 : max_pro]);
        }
    });



    const remove_map:Array<[number,number,number]> = old_miss.filter((value) => value !== undefined).map((value) => [value,-1,-1]);
    const add_map:Array<[number,number,number]> = new_miss.filter((value) => value !== undefined).map((value) => [-1,value,-1]);

    const all_map:Array<[number,number,number]> = mod_map.concat(remove_map.concat(add_map.concat(identical_map.map((value) => [value[0],value[1],1]))));


    const new_map = all_map.map((value) =>{
        const old_cell = old_notebook.mapCell(value[0]);
        const new_cell = new_notebook.mapCell(value[1]);
        return [old_cell[0],old_cell[1],new_cell[0],new_cell[1],value[2]];
    });

    const format_json = JSON.stringify(new_map.map((x) => x.toString()));
    

    return format_json;
      
    
}


