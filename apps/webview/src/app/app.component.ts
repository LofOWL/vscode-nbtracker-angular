import { Component, HostListener,OnInit} from '@angular/core';
import {DiffDecoder,line2line} from './diff_decoder';

@Component({
  selector: 'vscode-nbtracker-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'notebook diff test2';
  diffelements:DiffElement[];


  ngOnInit(){
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

}

class DiffElement{
  old_notebook;
  new_notebook;
  mapping:DiffDecoder;
  cell2cells;
  line2lines;

  constructor(input:JSON){
    this.old_notebook = JSON.parse(input["old_notebook"]).cells;
    this.new_notebook = JSON.parse(input["new_notebook"]).cells;
    this.mapping = new DiffDecoder(input["mapping"]);
    this.cell2cells = this.mapping.cell2cells.map((x)=> JSON.parse(JSON.stringify(x)));
    this.line2lines = this.mapping.line2lines.map((x) => JSON.parse(JSON.stringify(x)));
  }

  getCellMap(index:number){
    return this.line2lines.filter((x)=>x.old_cell_index == index);
  }

  getCellSource(notebook,index:number):JSON{
    return notebook[index-1].source;
  }

  getCellsSource(notebook,indexs:number[]):JSON[]{
    var result = [];
    for (let index of indexs){
      result.push(this.getCellSource(notebook,index))
    }
    return result;
  }

}

