import { Component, OnInit, Input } from '@angular/core';
import {DiffElement,line2line} from "../structure/diff_decoder";
import {Cell,DiffMapping} from './diff-mapping';

import {linediff} from './tool/linediff';
import {draw_line} from './tool/drawline';
import {generate_map} from './tool/map';

@Component({
  selector: 'vscode-nbtracker-angular-diff-mapping',
  templateUrl: './diff-mapping.component.html',
  styleUrls: ['./diff-mapping.component.css']
})
export class DiffMappingComponent implements OnInit {
  @Input() diff:DiffElement;
  canvas:HTMLCanvasElement;
  diffmapping:DiffMapping[];

  ngOnInit(): void {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = document.documentElement.clientWidth;
    // this.canvas.addEventListener("click", this.onClick, false);
    console.log(this.diff.old_notebook.cells);

  }

  selectCell(id:string,type:string){
    let value;
    if (type === "old"){
      let old_one = this.diff.old_notebook.cells.find((value) => value.id === id);
      old_one.selected = !old_one.selected;
      value = old_one.selected;
    }else{
      let new_one = this.diff.new_notebook.cells.find((value) => value.id === id);
      new_one.selected = !new_one.selected;
      value = new_one.selected;
    }

    const ele = document.getElementById(id+"_lines");
    ele.style.display = value ? "initial": "none";
    
    this.canvas.getContext('2d').clearRect(0,0,this.canvas.width,this.canvas.height);
    this.draw_lines();
    
  }

  ngAfterViewInit(){

    // create line level mapping
    this.create_line_diff();

    // update canvas hight
    this.update_canvas_height();

    // generate mapping
    generate_map(this);

    // draw line
    this.draw_lines();

    // generate element
    this.generate_all_element();

  }

  draw_lines(){
    for (let dm of this.diffmapping){
      console.log(dm);
      const old_cell = dm.old.element;
      for (let new_one of dm.new){
        const new_cell = new_one.element;
        draw_line(this,old_cell,new_cell);
      }
    }
  }


  generate_all_element(){
    this.generate_element(this.diff.old_notebook.cells);
    this.generate_element(this.diff.new_notebook.cells);
  }

  generate_element(cells:Cell[]){
    for (const cell of cells){
      cell.element = document.getElementById(cell.id);
    }
  }

  update_canvas_height(){
    var body = document.body,
    html = document.documentElement;
    this.canvas.height = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );
  }


  create_line_diff(){
    for (let line2line of this.diff.mapping.line2lines){
      if (line2line.new_cell_index !== -1 && line2line.old_cell_index !== -1){
        linediff(this,line2line,"old",false,false);
        linediff(this,line2line,"new",false,false);
      }else if (line2line.new_cell_index === -1 && line2line.old_cell_index !== -1){
        linediff(this,line2line,"old",false,true);
      }else if (line2line.new_cell_index !== -1 && line2line.old_cell_index === -1){
        linediff(this,line2line,"new",true,false);
      }
    }
  }


  getId(cell_index:number,type:string){
    return ""+cell_index+"-"+type;
  }

  getlineId(cell_index:number,line_index:number,type:string){
    return ""+cell_index+"-"+line_index+"-"+type;
  }


}


