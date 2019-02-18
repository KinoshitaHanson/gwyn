/**
 * @description: git configuration.
 * @author: pkeros.
 * @date: 01/11/2017.
 * @mail: pkeros@vip.qq.com
 */

const path = require('path');

console.log(path.resolve(__dirname, '../../../test'));

module.exports = {
  // 本地 git 目录
  localGitRoot: path.resolve(__dirname, '../../../workspace/test'),
  localProjectDirectory: '/h5.jdd.com',

  gitRepository: 'http://shenfei@git.jdd.com/qianduan/test.git',
  gitDirectory: ''
};


