import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { environment } from '../environments/environment';
import { watch } from 'fs';

export class NBWebview {
  extensionPath: string;
  panel: vscode.WebviewPanel;
  isStart: boolean;
  matchLinks = /(href|src)="([^"]*)"/g;
  toUri = (_, prefix: 'href' | 'src', link: string) => {
      // For
      if (link === '#') {
        return `${prefix}="${link}"`;
      }
      // For scripts & links
      const fpath = path.join(this.extensionPath, 'webview', link);
      const uri = vscode.Uri.file(fpath);
      return `${prefix}="${this.panel.webview['asWebviewUri'](uri)}"`;
    };

  constructor(extensionPath: string) {
    this.extensionPath = extensionPath;
    this.isStart = false;
  }

  onMessage(message){
    if (this.isStart){
      this.panel.webview.postMessage(message);
    }
  }
  
  addListener(filelist){

    if (this.isStart){
      this.panel.onDidChangeViewState(
        () => {
          this.onMessage(JSON.stringify(filelist));
          // for (let file of filelist){
          //   this.onMessage(file.context);
          // }
        }
      );
    }
  }

  setHtml(){
    const html = fs.readFileSync(
      path.join(this.extensionPath, 'webview/index.html'),
      'utf-8'
    );
    this.panel.webview.html = html.replace(this.matchLinks, this.toUri);
  }

  start(){
    this.panel = vscode.window.createWebviewPanel(
      'webview',
      'notebook-diff',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(this.extensionPath, 'webview')),
        ],
      }
    );

    this.setHtml();

    this.isStart = true;
  }

}
