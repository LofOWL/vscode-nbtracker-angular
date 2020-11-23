import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vscode-nbtracker-angular-diff-mapping',
  templateUrl: './diff-mapping.component.html',
  styleUrls: ['./diff-mapping.component.css']
})
export class DiffMappingComponent implements OnInit {
  @Input() old_cell_index: string;
  @Input() new_cell_index: string[];
  @Input() old_cell: string;
  @Input() new_cell:string[];


  constructor() { 
    console.log("get in diff mapping");
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    console.log("done");
    var element = document.getElementById("1-0-old");
    var rect = element.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
  }

  getId(cell_index:number,line_index:number,type:string){
    return ""+cell_index+"-"+line_index+"-"+type;
  }




}
