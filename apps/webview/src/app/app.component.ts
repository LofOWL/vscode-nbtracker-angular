import { Component, HostListener,OnInit} from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import {DiffElement} from './diff_decoder';

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
    console.log("get in AppComponent constructor");
    window.addEventListener('message', (event) => {
      const message = JSON.parse(event.data); // The JSON data our extension sent
      for (const de of message) {
        this.diffelements.push(new DiffElement(de));
      }
    });

  }


}



