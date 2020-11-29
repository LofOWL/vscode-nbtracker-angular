import { Component, OnInit, Input } from '@angular/core';
import {line2line} from "../diff_decoder";

@Component({
  selector: 'vscode-nbtracker-angular-diff-mapping',
  templateUrl: './diff-mapping.component.html',
  styleUrls: ['./diff-mapping.component.css']
})
export class DiffMappingComponent implements OnInit {
  @Input() old_cell_index: string;
  @Input() new_cell_index: string[];
  @Input() old_cell: string[];
  @Input() new_cell:string[][];
  @Input() mapping: line2line[];
  old_cell_blocks;
  new_cell_blocks;

  ngOnInit(): void {
    
  }

  // ngAfterViewInit(){
  //   console.log("done");
  //   for (let _i =0 ; _i < this.old_cell.length;_i++){
  //     console.log(this.getId(Number(this.old_cell_index),_i+1,"old"))
  //     var element = document.getElementById(this.getId(Number(this.old_cell_index),_i+1,"old"));
  //     var rect = element.getBoundingClientRect();
  //     console.log(rect.top, rect.right, rect.bottom, rect.left);
  //   }

  //   for(let _i = 0; _i < this.new_cell.length; _i++){

  //     for (let _j = 0; _j < this.new_cell[_i].length; _j++){
  //       console.log(this.getId(Number(this.new_cell_index[_i]),_j+1,"new"));
  //       var element = document.getElementById(this.getId(Number(this.new_cell_index[_i]),_j+1,"new"));
  //       var rect = element.getBoundingClientRect();
  //       console.log(rect.top, rect.right, rect.bottom, rect.left);
  //     }
  //   }

  //   for (let i of this.mapping){
  //     if (i.ratio == 1.0){
  //       let old_line = document.getElementById(this.getId(Number(i.old_cell_index),i.old_index,"old"));
  //       let new_line = document.getElementById(this.getId(Number(i.new_cell_index),i.new_index,"new"));
  //       // this.rawLine(old_line,new_line);
        

  //     }
  //   }
  // }

  rawLine(p1, p2) {
    const canvas = document.getElementById(this.old_cell_index);

  }

  getId(cell_index:number,line_index:number,type:string){
    return ""+cell_index+"-"+line_index+"-"+type;
  }




}
