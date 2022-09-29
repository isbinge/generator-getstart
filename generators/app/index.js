const Generator = require('yeoman-generator')
const commandExists = require('command-exists').sync
const path = require('path')
const config = require('./config')
const yosay = require('yosay')
const 

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    // this.argument('appName', { type: String, required: true })

    // this.log(this.options.appName)
    // Next, add your custom code
    // this.option('babel') // This method adds support for a `--babel` flag
  }
  // method1() {
  //   this.log('method 1 just ran')
  // }
  async prompting() {
    this.log(yosay('Welcome to Yeoman!'))
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.appname,
      },
    ])
  }
  setRootPath() {
    this.destinationRoot(this.answers.projectName)
    this.env.cwd = this.answers.projectName
  }
  // async prompting() {
  //   this.answers = await this.prompt([
  //     {
  //       type: 'input',
  //       name: 'title',
  //       message: 'Your project title',
  //     },
  //   ])
  // }
  // installingLodash() {
  //   this.addDevDependencies(['lodash'])
  // }
  writing() {
    const copy = (input, output) => {
      this.fs.copy(this.templatePath(input), this.destinationPath(output))
    }
    config.filesToCopy.forEach((file) => {
      copy(file.input, file.output)
    })
    // this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('public/index.html'), {
    //   title: this.answers.title,
    // })
  }
  install() {
    const hasNpm = commandExists('npm')
    this.addDependencies({
      npm: hasNpm,
    })
  }
  end() {
    this.log('Thanks for your using!')
  }
  // method2() {
  //   this.log('method 2 just ran')
  // }
}
