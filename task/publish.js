const inquirer = require('inquirer');
const { join } = require('path');
const { fork } = require('child_process');

inquirer
  .prompt({
    type: 'list',
    name: 'tag',
    message: '请选择发布版本的 tag 类型',
    choices: ['Patch', 'Minor', 'Major', 'Prerelease'],
  })
  .then(tag => {
      console.log(tag)
      let argv = [
        'publish',
        '--conventional-commits',
        '--yes'
      ];

      if(tag.tag === 'Patch') {
        // argv = argv.concat(
        //     '--cd-version patch'
        // )
      }else if(tag.tag === 'Minor') {
        // argv = argv.concat(
        //     '--cd-version minor'
        // )
      }else if(tag.tag === 'Major') {
        // argv = argv.concat(
        //     '--cd-version major'
        // )
      }else if(tag.tag === 'Prerelease') {
        argv = argv.concat(
            '--cd-version prerelease'
        )
      }

      const cp = fork(
        join(process.cwd(), 'node_modules/.bin/lerna'),
        argv.concat(process.argv.slice(2)),
        {
          stdio: 'inherit',
          cwd: process.cwd(),
        }
      )

      cp.on('error', err => {
        console.log(err);
      });
      cp.on('close', code => {
        if (code !== 0) {
          console.log(`Failed: lerna publish ${argv.join(' ')}`);
        //   shell.exit(1);
        }
  
        console.log('Changelog 生成完毕!');
        console.log(
          '如有需要请订正 changelog 后，执行 npm run publish 进行版本发布'
        );
        console.log('Tips: 发布完毕后，请给当前分支打好 tag(即对应的版本号)');
      });


  })