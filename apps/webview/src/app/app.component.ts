import { Component, HostListener,OnInit} from '@angular/core';
import {DiffElement} from './structure/diff_decoder';

@Component({
  selector: 'vscode-nbtracker-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'notebook diff test2';
  diffelements:Array<DiffElement> = [];
  check:string;


  ngOnInit(){
    window.addEventListener('message', (event) => {
      const message = JSON.parse(event.data); // The JSON data our extension sent
      for (const de of message) {
        this.diffelements.push(new DiffElement(de));
      }
    });
  }


}



