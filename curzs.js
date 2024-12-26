const curzs =
{
    build : 1
    ,
    line : 0
    ,
    syntaxes :
    [
        'receive'
        ,
        'give'
        ,
        'while'
        ,
        'if'
        ,
        '~/'
        ,
        '\~'
        ,
        '~'
        ,
        'func'
    ]
    ,
    variables : []
    ,
    functions : {}
    ,
    lexer(command) {
        if (typeof(command) == 'string') {
            if (command.search(' ') && command.endsWith(';')) {
                return command.split(' ')
            }
            if (command == '' || command.startsWith('~/' && command.endsWith('\~'))) {
                return
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Command']`
            }
        }
    }
    ,
    parser(tokens) {
        if (tokens[0] == 'receive' && tokens[1]) {
            //
        }
    }
    ,
    evaluator(result) {
        if (typeof(result) == 'string') {
            console.log(result)
        }
    }
    ,
    initialize(type) {
        if (typeof(type) == 'string') {
            this.evaluator(this.parser(this.lexer()))
        }
    }
}