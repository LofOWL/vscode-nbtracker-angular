import { Component, HostListener,OnInit} from '@angular/core';
import {DiffDecoder} from './diff_decoder';

@Component({
  selector: 'vscode-nbtracker-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'notebook diff test2';
  diffelements:DiffElement[];

  constructor(){
    this.diffelements = [];
    console.log("get in AppComponent constructor");
    window.addEventListener('message', (event) => {
      const message = JSON.parse(event.data); // The JSON data our extension sent
      for (let de of message){
        this.diffelements.push(new DiffElement(de));
      }
      console.log(this.diffelements.length);
    });
    
  }

  ngOnInit(){

  }

}

class DiffElement{
  old_notebook;
  new_notebook;
  mapping:DiffDecoder;
  cell2cells;

  constructor(input:JSON){
    this.old_notebook = JSON.parse(input["old_notebook"]).cells;
    this.new_notebook = JSON.parse(input["new_notebook"]).cells;
    this.mapping = new DiffDecoder(input["mapping"]);
    this.cell2cells = this.mapping.cell2cells.map((x)=> JSON.parse(JSON.stringify(x)));
    console.log(this.cell2cells);
    
  }

  getCell(notebook,index:number){
    return notebook[index-1].source;
  }

  getCells(notebook,indexs:number[]){
    var result = [];
    for (let index of indexs){
      result.push(this.getCell(notebook,index))
    }
    return result;
  }

}

