const inquirer = require('inquirer');

inquirer
  .prompt({
    type: 'list',
    name: 'tag',
    message: '请选择发布版本的 tag 类型',
    choices: ['production', 'beta'],
  })
  .then(tag => {
      console.log(tag)
  })