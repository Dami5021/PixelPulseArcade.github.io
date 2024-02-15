# Website Project Repository

Welcome to our website project. This repository contains our collaborative web project.

## Getting Started

To contribute to this project, follow these steps to set up your environment.

### Cloning the Repository

#### On Mac:

1. Open Terminal.
2. Navigate to the directory where you want to clone the repository.
3. Clone the repository with the following command:
   ```
   git clone https://github.com/cheikhdiop1/website-project-repository.git
   ```
4. Navigate to the project directory:
   ```
   cd website-project-repository
   ```

#### On Windows:

1. Open Command Prompt or Git Bash.
2. Navigate to the directory where you want to clone the repository.
3. Clone the repository with the following command:
   ```
   git clone https://github.com/cheikhdiop1/website-project-repository.git
   ```
4. Navigate to the project directory:
   ```
   cd website-project-repository
   ```

### Setting Up the Environment

1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Open Visual Studio Code, navigate to the cloned repository folder, and open a new terminal.
3. Install the project dependencies with the following command:
   ```
   npm install
   ```

### VS Code Extensions Checklist

Please install the following extensions in Visual Studio Code to assist in development:

- GitHub Pull Requests and Issues: Work with GitHub directly from VS Code. Find it in the Marketplace or [click here](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github).
- Jest Runner: Easily run Jest tests from the editor. Find it in the Marketplace or [click here](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner).

To install an extension, you can search for it in the Extensions view (Ctrl+Shift+X) or install it directly from the Visual Studio Code Marketplace.

### Running Tests

Ensure that all tests pass before committing changes:

```
npm test
```

### Committing Changes

You can commit changes using either the Source Control panel in VS Code or terminal commands:

#### Using Source Control Panel:

1. Open the Source Control panel (Ctrl+Shift+G).
2. Stage your changes by clicking the '+' icon next to each file or by clicking 'Stage All Changes'.
3. Enter a commit message in the message box.
4. Press the check mark icon to commit the changes.

#### Using Terminal Commands:

1. Stage your changes:
   ```
   git add .
   ```
2. Commit your changes:
   ```
   git commit -m "Your commit message"
   ```
3. Push your changes:
   ```
   git push origin main
   ```

## Collaboration Workflow

Please create a new branch for your features, push your branch, and open a pull request when you're ready to merge your changes. This helps us review code and maintain a stable main branch.