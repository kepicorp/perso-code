// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('macro.play', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		const macro = context.globalState.get('macro', '');

		if (editor) {
			//const position = editor.selection.active;

			vscode.window.showInputBox({ value: '1', ignoreFocusOut: true}).then(input => {
				if (input === undefined) {
					vscode.window.showErrorMessage('Give a number of iteration ');	
				}
				else if (isNaN(+input)) {
					vscode.window.showErrorMessage('Expecting a number ');
				}
				else {
					const myArr = Array.from(Array(+input),(x,i)=>i);
					editor.edit(editBuilder => {
						myArr.forEach((val, index) => {
							editBuilder.insert(new vscode.Position(editor.selection.active.line+index, 0), macro);
						});
					});
				}
			});

			
		}

	});

	let disposable2 = vscode.commands.registerCommand('macro.rec', () => {
		vscode.window.showInputBox({ placeHolder: 'text to replay', ignoreFocusOut: true}).then(input => {
			context.globalState.update('macro', input);
			vscode.window.showInformationMessage('Saved macro: ' + input);
		});
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
}

// this method is called when your extension is deactivated
export function deactivate() {}
