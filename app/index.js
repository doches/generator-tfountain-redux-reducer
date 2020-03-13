var Generator = require('yeoman-generator');

var chalk = require('chalk');
var yosay = require('yosay');

function decompose(name) {
    return name.replace(/[^a-zA-Z]/g, " ").replace(/\s+/g, " ").trim().split(" ");
}

function camelcase(name) {
    var words = decompose(name);
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length);
    }
    return words.join("");
}

var Generator = require('yeoman-generator');
module.exports = class extends Generator {
    async prompting() {
        this.log(yosay(
            'Welcome to ' + chalk.red('tfountain-redux-reducer')
        ));

        var dir = this.destinationRoot()
        if (dir.split("/").length > 1) {
            dir = dir.split("/")
            dir = dir[dir.length-1]
        }

        var prompts = [{
            type: 'input',
            name: 'singular',
            message: 'Type name for single object (e.g. item)',
            default: "item"
        }, {
            type: 'input',
            name: 'plural',
            message: 'Type name for collection of objects (e.g. items)',
            default: "items"
        }];

        const answers = await this.prompt(prompts)
        this.props = {};
        this.props.plural = answers.plural.toLowerCase();
        this.props.pluralInitialCaps = camelcase(answers.plural.toLowerCase());
        this.props.pluralAllCaps = answers.plural.toUpperCase();
        this.props.lowercase = answers.singular.toLowerCase();
        this.props.initialCaps = camelcase(answers.singular.toLowerCase());
        this.props.allCaps = answers.singular.toUpperCase();
    }

    writing() {
        // Files to copy 
        var files = [
            {source: "reducer.ts", destination: `${this.props.plural}.ts`}
        ];
        for (var i = 0; i < files.length; i++) {
            this.fs.copyTpl(
                this.templatePath(files[i].source),
                this.destinationPath(files[i].destination),
                this.props
            );
        }
    }

    install () {
    }
};
