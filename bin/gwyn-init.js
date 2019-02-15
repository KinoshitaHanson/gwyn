const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const inquirer = require('inquirer');

/**
 * Usage.
 */

program.usage('<name>').parse(process.argv);

init();


async function init() {
    const answer = await new Promise((r, s) => {
        r(inquirer.prompt([
            {
                name: 'projectName',
                message: '项目名称',
                default: 'gaea-init'
            },
            {
                name: 'projectVersion',
                message: '项目版本号',
                default: '1.0.0'
            },
            {
                name: 'mode',
                type: 'list',
                message: '项目模式',
                choices:
                    [{
                        name: 'single',
                    }, {
                        name: 'multiple',
                    }]
            },
            {
                name: 'brand',
                type: 'confirm',
                message: '是否启用多品牌',
            },
            {
                name: 'bucket',
                type: 'checkbox',
                message: '第三方依赖库(多选)',
                choices:
                    [{
                        name: 'vue',
                        checked: true
                    }, {
                        name: 'axios',
                        checked: true
                    }, {
                        name: 'vue-router',
                        checked: true
                    }, {
                        name: 'vuex',
                        checked: false
                    }]
            }
        ]));
    });

    console.log(answer);
}


