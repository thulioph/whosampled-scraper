const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'artist',
    message: 'What is the artist you want to search?',
    default: () => {
      return 'Kendrick Lamar';
    },
    validate: (value) => {
      artistName = value.toLowerCase().replace(' ', '-');
      return true;
    },
  }
];

const cli = {
  start: () => {
    return new Promise((resolve, reject) => {
      inquirer.prompt(questions)
        .then(({ artist }) => resolve(artist))
        .catch((err) => reject(err));
    });
  },
};

module.exports = cli;