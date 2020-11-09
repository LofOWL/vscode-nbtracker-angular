import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class NBWebview {
  extensionPath: string;
  panel: vscode.WebviewPanel;

  constructor(extensionPath: string) {
    this.extensionPath = extensionPath;
    this.panel = vscode.window.createWebviewPanel(
      'webview',
      'notebook-diff',
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.file(path.join(this.extensionPath, 'webview'))],
      }
    );

    this.panel.webview.html = this._getWebviewContent();
    // context.subscriptions.push(panel);
  }

  _getWebviewContent() {
    let html = fs.readFileSync(path.join(this.extensionPath, 'webview/index.html'),
      'utf-8'
    );

    const matchLinks = /(href|src)="([^"]*)"/g;
    const toUri = (_, prefix: 'href' | 'src', link: string) => {
      // For
      if (link === '#') {
        return `${prefix}="${link}"`;
      }
      // For scripts & links
      const fpath = path.join(this.extensionPath, 'webview', link);
      const uri = vscode.Uri.file(fpath);
      return `${prefix}="${this.panel.webview['asWebviewUri'](uri)}"`;
    };
    return html.replace(matchLinks, toUri);
  }
}
