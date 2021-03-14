import { Component, OnInit, Input } from '@angular/core';
import {DiffElement} from "../structure/diff_decoder";

import {linediff} from './tool/linediff';
import {draw_line} from './tool/drawline';
import {generate_map,Cell,DiffMapping} from './tool/map';

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

    // remove the identical
    this.remove_identical();
  }

  selectCell(id:string,type:string){
    this.set_cell_visible(id);

    if (type === "old"){
      this.diffmapping.forEach((value) =>{
        if (value.old.id === id){
          value.new.forEach((new_value) =>{
            this.set_cell_visible(new_value.id);
          })
        }
      });
    }else{
      this.diffmapping.forEach((value) =>{
        value.new.forEach((new_value) =>{
          if (new_value.id === id){
            this.set_cell_visible(value.old.id);
          }
        })
      });
    }

    this.refresh_canvas();
    
  }

  refresh_canvas(){
    this.canvas.getContext('2d').clearRect(0,0,this.canvas.width,this.canvas.height);
    this.draw_lines();
  }
 
  set_cell_visible(id:string){
    const ele = document.getElementById(id+"_lines");
    ele.style.display = ele.style.display === "initial" ? "none": "initial";
  }

  draw_lines(){
    for (let dm of this.diffmapping){
      const old_cell = dm.old.element;
      for (let new_one of dm.new){
        const new_cell = new_one.element;
        draw_line(this,old_cell,new_cell);
      }
    }
  }
  
  remove_identical(){
    for (const map of this.diff.mapping.cell2cells){
      if (map.new_cell_indexs.length === 1){
        const old_source = JSON.stringify(this.diff.old_notebook.getCellSource(Number(map.old_cell_index)));
        const new_source = JSON.stringify(this.diff.new_notebook.getCellSource(Number(map.new_cell_indexs[0])));
        if (old_source === new_source){
          const old_cell = this.diff.old_notebook.getHTMLElement(map.old_cell_index);
          const new_cell = this.diff.new_notebook.getHTMLElement(map.new_cell_indexs[0]);
          const old_ele_ele = document.getElementById(old_cell.id+"_lines");
          old_ele_ele.style.display = "none";
          const new_ele_ele = document.getElementById(new_cell.id+"_lines");
          new_ele_ele.style.display = "none";
        }
      }
    }
    this.refresh_canvas();
  }

  generate_all_element(){
    this.generate_element(this.diff.old_notebook.cells);
    this.generate_element(this.diff.new_notebook.cells);
  }

  generate_element(cells:Cell[]){
    for (const cell of cells){
      cell.element = document.getElementById(cell.id);
      // init lines click
      const lines = document.getElementById(cell.id+"_lines");
      lines.style.display = "initial";
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


