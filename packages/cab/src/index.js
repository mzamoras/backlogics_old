import {welcomeMessage} from './tools/output';
import packageJson from '../package.json';
import program from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import chalk from 'chalk';
import tools from './tools/tools';
import fs from 'fs-extra';
import {createProjectQuestions} from './tools/constants';


welcomeMessage(packageJson);
const packCommand = 'cab';

program
    .version(packageJson.version, '-v, -ver')
    .name(packCommand);

program.command('create <name>')
    .description('Creates a new project')
    .action(createProject);

program.command('reboot')
    .description('reboots current project')
    .option("-delete-allConfig")
    .action((cmd, options) => {
        console.log('com2', cmd, options);
    })


program.on('command:*', function () {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);

function createOption(name, selected = false, disabled = false) {
    return { name, selected, disabled };
}



function createProject(name) {

    const templates = {
        'Web App': 'web-app',
        'Web App + Electron': 'electron-web-app',
        'Only Electron': 'electron',
        'Chrome Extension': 'chrome-extension',
    }

    const frameworks = [
        createOption('React', true),
        createOption('Vue'),
        createOption('Svelte'),
    ];

    const projectType = Object.keys(templates).map((k, i) => {
        return createOption(k, !i);
    });

    const compiler = [
        createOption('Parcel', true),
        createOption('Webpack')
    ];

    const installingPath = path.join(process.cwd(), name);

    console.log();
    console.log(`This will be the path where your project will be created:\n${chalk.greenBright(installingPath)}`);
    console.log();
    

    inquirer.prompt(createProjectQuestions(frameworks, projectType, compiler)).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
        if(answers.rightPath){
            installProject(installingPath, name, answers, templates);
        }
    });

}

function installProject(givenPath, name, answers, templates) {
    const root = path.resolve(givenPath);
    const appName = path.basename(root);
    const currentTempPath = path.resolve(__dirname, '../templates/', templates[answers.projectType], 'src');

    fs.ensureDirSync(givenPath);
    
    if (!tools.isSafeToCreateProjectIn(root, name)){
        //fs.copy(templates, path.join(root, '/src'));
        console.log('INSTALLING');
    }
}