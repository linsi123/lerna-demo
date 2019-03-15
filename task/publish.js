const inquirer = require('inquirer');
const { join } = require('path');
const { fork } = require('child_process');

inquirer
  .prompt({
    type: 'list',
    name: 'tag',
    message: '请选择发布版本的 tag 类型',
    choices: [
        {
            name: 'Patch(0.0.1=>0.0.2)', 
            value: 'patch'
        },
        {
            name: 'Minor(0.0.1=>0.1.0)',
            value: 'minor'
        },
        {
            name: 'Major(0.0.1=>1.0.0)',
            value: 'major'
        }, 
        {
            name: 'Prepatch(0.0.1=>0.0.2-alpha.0)',
            value: 'prepatch'
        },
        {
            name: 'Preminor(0.0.1=>0.1.0-alpha.0)',
            value: 'preminor'
        },
        {
            name: 'Premajor(0.0.1=>1.0.0-alpha.0)',
            value: 'premajor',
        },
        {
            name: 'Prerelease alpha(0.0.1=>0.0.1-alpha.0)',
            value: 'prerelease alpha'
        },
        {
            name: 'Prerelease beta(0.0.1=>0.0.1-beta.0)',
            value: 'prerelease beta'
        }
    ],
  })
  .then(tag => {
      console.log(tag)
      let argv = [
        'publish',
        '--conventional-commits',
      ];

      if(tag.tag === 'patch') {
        argv = argv.concat(
            '--cd-version=patch'
        )
      }else if(tag.tag === 'minor') {
        argv = argv.concat(
            '--cd-version=minor'
        )
      }else if(tag.tag === 'major') {
        argv = argv.concat(
            '--cd-version=major'
        )
      }else if(tag.tag === 'prepatch') {
        argv = argv.concat(
            '--cd-version=prepatch'
        ) 
      }else if(tag.tag === 'preminor') {
        argv = argv.concat(
            '--cd-version=preminor'
        ) 
      }else if(tag.tag === 'premajor') {
        argv = argv.concat(
            '--cd-version=premajor'
        ) 
      }else if(tag.tag === 'prerelease alpha') {
        argv = argv.concat(
            '--cd-version=prerelease',
            '--preid=alpha'
        )
      }else if(tag.tag === 'prerelease beta') {
        argv = argv.concat(
            '--cd-version=prerelease',
            '--preid=beta'
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