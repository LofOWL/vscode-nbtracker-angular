import { Component, OnInit, Input } from '@angular/core';
import {DiffElement,cell2cell} from "../diff_decoder";


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
    var body = document.body,
    html = document.documentElement;
    this.canvas.height = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );

    var old_list:HTMLElement[] = [];
    // tslint:disable-next-line: forin
    for(const index in this.diff.old_notebook){
      var element = document.getElementById(this.getId(Number(index),"old"));
      old_list.push(element);
    }

    var new_list:HTMLElement[] = [];
    // tslint:disable-next-line: forin
    for(const index in this.diff.new_notebook){
      var element = document.getElementById(this.getId(Number(index),"new"));
      new_list.push(element);
    }

    var bodyRect = document.body.getBoundingClientRect();

    var c = this.canvas.getContext('2d');
    // tslint:disable-next-line: forin
    for (const index in this.diff.old_notebook){
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

  getId(cell_index:number,type:string){
    return ""+cell_index+"-"+type;
  }




}


