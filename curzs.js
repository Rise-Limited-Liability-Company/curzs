const nodeJs = {
    fs : require('fs')
    ,
    prompt : require('prompt-sync')({sigint: true})
    ,
    process : require('process')
}
const curzs =
{
    build: 1
    ,
    line: 0
    ,
    maxLines: 0
    ,
    packageEnabled: 
    {
        basics: false
        ,
        colors: false
    }
    ,
    variables: {}
    ,
    functions: {}
    ,
    lexer(command) {
        if (typeof(command) == 'string') {
            if (command.search(' ') && command.endsWith(';')) {
                return command.split(' ')
            }
            if (command.startsWith('~/') && command.endsWith('/~')) {
                return ''
            }

            else {
                return `[CURZS:LINE:${this.line}]:['Invalid Command']`
            }
        }
    }
    ,
    parser(tokens) {
        if (tokens[0] == 'receive' && tokens[1] == '[basics.clib];') {
            this.packageEnabled.basics = true
            return `[CURZS:LINE:${this.line}]:['Package Added']`
        }
        if (tokens[0] == 'receive' && tokens[1] == '[colors.clib];') {
            this.packageEnabled.colors = true
            return `[CURZS:LINE:${this.line}]:['Package Added']`
        }
        if (tokens[0] == 'add' && tokens[1]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[1].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith('];')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const values = a3.split(',')
                        try {
                            const A = parseInt(values[0])
                            const B = parseInt(values[1])
                            return A + B
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Number']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'sub' && tokens[1]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[1].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith('];')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const values = a3.split(',')
                        try {
                            const A = parseInt(values[0])
                            const B = parseInt(values[1])
                            return A - B
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Number']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'mult' && tokens[1]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[1].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith('];')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const values = a3.split(',')
                        try {
                            const A = parseInt(values[0])
                            const B = parseInt(values[1])
                            return A * B
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Number']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'div' && tokens[1]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[1].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith('];')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const values = a3.split(',')
                        try {
                            const A = parseInt(values[0])
                            const B = parseInt(values[1])
                            return A / B
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Number']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
    }
    ,
    evaluator(result) {
        console.log(result)
    }
    ,
    singleLine(command) {
        if (typeof(command) == 'string') {
            this.evaluator(this.parser(this.lexer(command)))
        }
    }
    ,
    interpreter() {
        this.line++
        const input = nodeJs.prompt('%>')
        this.singleLine(input)
        this.interpreter()
    }
    ,
    manual(file) {
        if (typeof(file) == 'string') {
            try {
                const file = nodeJs.fs.readFileSync(`${file}`, 'utf8')
                this.evaluator(`${file}`)
            } catch (error) {
                this.evaluator(`[CURZS:LINE:${this.line}]:['Invalid Path or File']`)
            }
        }
    }
}

curzs.evaluator(`['CURZS']['BUILD']:['${curzs.build.toString()}']`)

if (process.argv[2] == 'interpreter') {
    curzs.interpreter()
}
if (process.argv[2] != 'interpreter' && process.argv[2] != null) {
    curzs.manual(process.argv[2])
}