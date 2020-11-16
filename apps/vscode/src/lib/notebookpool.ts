import * as vscode from 'vscode';
import { Notebook } from './notebook';
import { NBWebview } from './nbwebview';

import {notebook} from "../diff-algorithm/nb_components/notebook";
import {nbdiff} from "../diff-algorithm/nbdiff";



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
    for (let file of this.filelist) {
      console.log(file.uri.fsPath);
    }
  }

  diff(extensionPath: string) {
    vscode.window.showInformationMessage('diff');

    
    //test
    let new_notebook = new notebook(this.filelist[0].uri.fsPath);
    let old_notebook = new notebook(this.filelist[1].uri.fsPath);

    let nd = new nbdiff(old_notebook,new_notebook);
    nd.generate();
    var result = nd.toJSON();

    const panel = new NBWebview(extensionPath);
    panel.start();
    panel.addListener(this.filelist);
  }

  isExist(e: vscode.Uri) {
    var isExist = false;
    for (let file of this.filelist) {
      if (file.uri.fsPath == e.fsPath) {
        return true;
      }
    }
    return isExist;
  }
}
