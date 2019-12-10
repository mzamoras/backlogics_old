import {welcomeMessage} from './tools/output';
import packageJson from '../package.json';
import program from 'commander';
import inquirer from 'inquirer';
import {emojis} from './tools/constants';

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
    const frameworks = [
        createOption('React'),
        createOption('Vue'),
        createOption('Svelte'),
    ];

    const projectType = [
        createOption('Web App'),
        createOption('WebApp + Electron'),
        createOption('Chrome Extension'),
    ];

    const compiler = [
        createOption('Parcel', true),
        createOption('Webpack')
    ];
    inquirer.prompt([{
        type: 'list',
        message: 'Select the Javascript Framework you would like to implement',
        name: 'options2',
        choices: frameworks
    }]);
    inquirer.prompt([{
        type: 'list',
        message: 'Select the Javascript Framework you would like to implement',
        name: 'options2',
        choices: compiler
    }]);
    //console.log('com1', name);
}