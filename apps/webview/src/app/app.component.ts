import { Component, HostListener,OnInit} from '@angular/core';

@Component({
  selector: 'vscode-nbtracker-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'notebook diff test2';
  file_list = [];
  diff_map_list = [];

  constructor(){
    this.file_list = [];
    console.log("get in AppComponent constructor");
    window.addEventListener('message', (event) => {
      const message = JSON.parse(event.data); // The JSON data our extension sent
      
      for (let file of message){
        const file_data = JSON.parse(file.context);
        const cell_list = []
        for (let cell of file_data["cells"]){
          cell_list.push(cell);
        }
        this.file_list.push(cell_list);
      }
    });
    console.log(this.file_list);
  }

  ngOnInit(){
    console.log("get in init");
  }

}
