import * as vscode from 'vscode';
import { Notebook } from './notebook';
import { NBWebview } from './nbwebview';

import {DiffElement} from "./diff_element";



export default class NotebookPool {
  public filelist: Notebook[];

  constructor() {
    this.filelist = [] as Notebook[];
  }

  async addFile(e: vscode.Uri) {
    console.log(e);
    if (!this.isExist(e)) {
      const file = new Notebook(e);
      await file.setContext();
      this.filelist.push(file);
      vscode.window.showInformationMessage('file added');
    } else {
      vscode.window.showInformationMessage('file existed');
    }
    console.log('new:');
    for (const file of this.filelist) {
      console.log(file.uri.fsPath);
    }
  }

  diff(extensionPath: string) {
    let index = 0;
    const diffelements:DiffElement[] = [];
    while (index < this.filelist.length-1){
      diffelements.push(new DiffElement(this.filelist[index],this.filelist[index+1]));
      index ++;
    }

    const panel = new NBWebview(extensionPath);
    panel.start(diffelements);
    
  }

  isExist(e: vscode.Uri) {
    const isExist = false;
    for (const file of this.filelist) {
      if (file.uri.fsPath == e.fsPath) {
        return true;
      }
    }
    return isExist;
  }
}
