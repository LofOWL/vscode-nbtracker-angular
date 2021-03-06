import * as vscode from "vscode";
import * as path from "path";

class Notebook {
  uri: vscode.Uri;
  context: string;

  constructor(uri: vscode.Uri) {
    this.uri = uri;
    this.context = "";
  }

  async setContext() {
    await vscode.workspace.openTextDocument(this.uri).then((document) => {
      this.context = document.getText();
    });
  }
}

export { Notebook };
