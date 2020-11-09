
// On activation
import * as vscode from 'vscode';
import NotebookPool from './lib/notebookpool';

const np = new NotebookPool();

export function activate(context: vscode.ExtensionContext) {

	
	context.subscriptions.push(
		vscode.commands.registerCommand('notebook-tracker.add_file_to_pool', (uri)=>np.addFile(uri))
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('notebook-tracker.diff_pool', 
		()=>np.diff(context.extensionPath))
	
	);


	  

}


export function deactivate() {}
