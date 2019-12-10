import clearConsole from 'react-dev-utils/clearConsole';
import chalk from 'chalk';
import boxen from 'boxen';
import {emojis} from './constants';

// Chalk Shortcuts
const hl = chalk.reset.green;
const hlb = hl.bold;
const wr = chalk.reset.yellow;
const wrb = wr.bold;
const inv = chalk.reset.inverse;
const inb = inv.bold;
const imp = chalk.reset.cyan;
const impb = imp.bold;

export function boxedMessage(message, color = 'cyan') {
    const box = boxen(message, {
        padding: 1,
        dimBorder: 1,
        borderColor: color,
        align: 'center',
        margin: 0
    });
    return box;
}

export function welcomeMessage(packageJson) {
    const desc = chalk.dim(packageJson.description.replace(',', ',\n'));
    const message = chalk.cyan(`Running ${impb(packageJson.name)} v${packageJson.version}\n\n${desc}\n\nThanks for using this repository!!!\n${emojis.happy}`)
    clearConsole();
    console.log(emojis.smile);
    console.log(boxedMessage(message));
}