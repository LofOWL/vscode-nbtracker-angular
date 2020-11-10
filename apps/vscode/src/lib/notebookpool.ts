import * as vscode from 'vscode';
import { Notebook } from './notebook';
import { NBWebview } from './nbwebview';

export default class NotebookPool {
  public filelist: Notebook[];

  constructor() {
    this.filelist = [] as Notebook[];
  }

  async addFile(e: vscode.Uri) {
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
