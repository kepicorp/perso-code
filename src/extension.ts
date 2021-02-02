// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "star" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('star.macro', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;

		if (editor) {
			//const position = editor.selection.active;
			const position = editor.selection.active;
			editor.edit(editBuilder => {
				let macro = context.globalState.get('macro', '');
				editBuilder.insert(position, macro);
			});
		}

	});

	let disposable2 = vscode.commands.registerCommand('star.store', () => {
		vscode.window.showInputBox({ placeHolder: '*  ', ignoreFocusOut: true}).then(input => {
			context.globalState.update('macro', input);
			vscode.window.showInformationMessage('Saved macro: ' + input);
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
