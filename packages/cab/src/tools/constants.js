export const emojis = {
    smile: 'o( o ‿ o )o',
    happy: 'ヾ( ^ _ ^ )ノ',
    confused: '( •  • ? )',
    thinking: '(  • _ • )',
    wink: '｡o( - ‿ • )o'
};

export const createProjectQuestions = (frameworks, projectType, compiler) => [
    {
        type: 'confirm',
        name: 'rightPath',
        message: 'Is the path OK ?',
    },
    {
        type: 'list',
        message: 'Select the Javascript Framework',
        name: 'framework',
        choices: frameworks,
        when: answers => answers.rightPath
    },
    {
        type: 'list',
        message: 'What kind of project is this ?',
        name: 'projectType',
        choices: projectType,
        when: answers => answers.rightPath
    },
    {
        type: 'list',
        message: 'Choose your compiler',
        name: 'compiler',
        choices: compiler,
        when: answers => answers.rightPath
    }
];