module.exports = [
  {
    type: 'select',
    name: 'level',
    message: 'Choose the atomic level of component you will generate',
    choices: ['Atoms', 'Molecules', 'Organisms', 'Templates','Utils'],
  },
  {
    type: 'input',
    name: 'name',
    message: `Input your component's name`,
  },
];
