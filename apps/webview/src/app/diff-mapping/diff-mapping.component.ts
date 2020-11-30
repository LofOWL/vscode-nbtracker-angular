import { Component, OnInit, Input } from '@angular/core';
import {DiffElement,cell2cell,line2line} from "../diff_decoder";
import {diffChars} from 'diff';

@Component({
  selector: 'vscode-nbtracker-angular-diff-mapping',
  templateUrl: './diff-mapping.component.html',
  styleUrls: ['./diff-mapping.component.css']
})
export class DiffMappingComponent implements OnInit {
  @Input() diff:DiffElement;
  canvas;

  ngOnInit(): void {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = document.documentElement.clientWidth;
  }

  ngAfterViewInit(){

    // line 2 line diff
    for (let line2line of this.diff.mapping.line2lines){
      console.log(JSON.stringify(line2line));
      if (line2line.new_cell_index !== -1 && line2line.old_cell_index !== -1){
        this.linediff(line2line,"old",false,false);
        this.linediff(line2line,"new",false,false);
      }else if (line2line.new_cell_index === -1 && line2line.old_cell_index !== -1){
        this.linediff(line2line,"old",false,true);
      }else if (line2line.new_cell_index !== -1 && line2line.old_cell_index === -1){
        this.linediff(line2line,"new",true,false);
      }
    }

    var body = document.body,
    html = document.documentElement;
    this.canvas.height = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );

    var old_list:HTMLElement[] = [];
    // tslint:disable-next-line: forin
    for(const index in this.diff.old_notebook.data){
      var element = document.getElementById(this.getId(Number(index),"old"));
      old_list.push(element);
    }

    var new_list:HTMLElement[] = [];
    // tslint:disable-next-line: forin
    for(const index in this.diff.new_notebook.data){
      var element = document.getElementById(this.getId(Number(index),"new"));
      new_list.push(element);
    }

    var c = this.canvas.getContext('2d');
    // tslint:disable-next-line: forin
    for (const index in this.diff.old_notebook.data){
      var a:cell2cell = this.diff.mapping.mapcell(Number(index)+1);
      for (let new_cell of a.new_cell_indexs){
        var old_one = old_list.find((value,index) => index === a.old_cell_index-1);
        var new_one = new_list.find((value,index) => index === new_cell-1);
        c.beginPath();
        c.moveTo(old_one.offsetLeft+old_one.offsetWidth,old_one.offsetTop+old_one.offsetHeight/2);
        c.lineTo(new_one.offsetLeft,new_one.offsetTop+new_one.offsetHeight/2);
        c.lineWidth = 3;
        c.strokeStyle = '#ff0000';
        c.stroke();
      }
    } 

  }

  linediff(l2l:line2line,type:string,isOldEmpty:boolean,isNewEmpty:boolean){
    
    const old_one = isOldEmpty ? "" : this.diff.old_notebook.getLineSource(l2l.old_cell_index,l2l.old_index);
    const new_one = isNewEmpty ? "" : this.diff.new_notebook.getLineSource(l2l.new_cell_index,l2l.new_index);


    const aid = type === "old" ? this.getlineId(l2l.old_cell_index,l2l.old_index,type) :this.getlineId(l2l.new_cell_index,l2l.new_index,type);
    const display = document.getElementById(aid);
    const diff = type === "old" ? diffChars(new_one, old_one) : diffChars(old_one, new_one);
    const fragment = document.createDocumentFragment();
 
    diff.forEach((part) => {
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
      var span = document.createElement('span');
      span.style.color = color;
      span.appendChild(document
        .createTextNode(part.value));
      fragment.appendChild(span);
    });
    
    display.appendChild(fragment);
    
  }

  getId(cell_index:number,type:string){
    return ""+cell_index+"-"+type;
  }

  getlineId(cell_index:number,line_index:number,type:string){
    return ""+cell_index+"-"+line_index+"-"+type;
  }




}


