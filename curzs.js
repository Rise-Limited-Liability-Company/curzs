const nodeJs = {
    fs : require('fs')
    ,
    prompt : require('prompt-sync')({sigint: true})
    ,
    process : require('process')
}
const curzs =
{
    build: 2
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
    end: false
    ,
    variables: {}
    ,
    pointers: {}
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
        if (tokens[0] == 'off' && tokens[1] == '[curzs];') {
            this.end = true
            return `[CURZS:LINE:${this.line}]:['Closed CURZS']`
        }
        if (tokens[0] == 'give' && tokens[1]) {
            if (tokens[1] in this.variables) {
                return this.variables[tokens[1].toString()]
            } else {
                return tokens[1]
            }
        }
        if (tokens[0] == 'type' && tokens[1] == 'string' && tokens[2] && tokens[3]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[2].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith(']')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const string = a3
                        try {
                            if (string in this.variables) {
                                return `[CURZS:LINE:${this.line}]:['Already created ${string}']`
                            } else {
                                const unChecked2 = tokens[3].toString()
                                if (unChecked2.startsWith('[') && unChecked2.endsWith('];')) {
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    this.variables[string] = b2
                                }
                            }
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid String']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'type' && tokens[1] == 'number' && tokens[2] && tokens[3]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[2].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith(']')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const number = a3
                        try {
                            if (number in this.variables) {
                                return `[CURZS:LINE:${this.line}]:['Already created ${number}']`
                            } else {
                                const unChecked2 = tokens[3].toString()
                                if (unChecked2.startsWith('[') && unChecked2.endsWith('];')) {
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    this.variables[number] = parseInt(b2)
                                }
                            }
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Number']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'type' && tokens[1] == 'pointer' && tokens[2] && tokens[3]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[2].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith(']')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const pointer = a3
                        try {
                            if (pointer in this.pointers) {
                                return `[CURZS:LINE:${this.line}]:['Already created ${pointer}']`
                            } else {
                                const unChecked2 = tokens[3].toString()
                                if (unChecked2.startsWith('[') && unChecked2.endsWith('];')) {
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.pointers[pointer] = b3
                                }
                            }
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Pointer']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'point' && tokens[1]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[1].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith('];')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2.replace(';','').toString()
                        const pointed = a3
                        try {
                            this.evaluator(this.parser(`type [pointer] [${pointed}];`))
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Pointer']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'if' && tokens[1] && tokens[2] && tokens[3]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[1].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith(']')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const condition = a2.split(',')
                        try {
                            const A = condition[0]
                            const B = condition[1]
                            const C = condition[2]
                            if (B == '==') {
                                if (A == C) {
                                    const unChecked2 = tokens[2].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace(']','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                } else {
                                    const unChecked2 = tokens[3].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                }
                            }
                            if (B == '!=') {
                                if (A != C) {
                                    const unChecked2 = tokens[2].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace(']','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                } else {
                                    const unChecked2 = tokens[3].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                }
                            }
                            if (B == '>') {
                                if (A == C) {
                                    const unChecked2 = tokens[2].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace(']','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                } else {
                                    const unChecked2 = tokens[3].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                }
                            }
                            if (B == '<') {
                                if (A == C) {
                                    const unChecked2 = tokens[2].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace(']','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                } else {
                                    const unChecked2 = tokens[3].toString()
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    this.evaluator(this.parser(b3.split(' ')))
                                }
                            }
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Condition']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'once' && tokens[1] == '[js];') {
            const input = nodeJs.prompt('$>')
            try {
                eval(input)
                return `[CURZS:LINE:${this.line}]:['Finished JavaScript Command']`
            } catch (error) {
                return `[CURZS:LINE:${this.line}]:['Invalid JavaScript Command']`
            }
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
    idle() {
        this.line++
        const input = nodeJs.prompt('%>')
        this.singleLine(input)
        if (this.end == false) {
            this.idle()
        } else {
            return
        }
    }
    ,
    interpreter(fts) {
        if (typeof(fts) == 'string') {
            try {
                const file = nodeJs.fs.readFileSync(fts, 'utf-8')
                this.evaluator(file)
            } catch (error) {
                this.evaluator(`[CURZS:LINE:${this.line}]:['Invalid Path or File']`)
            }
        }
    }
}

curzs.evaluator(`['CURZS']['BUILD']:['${curzs.build.toString()}']`)

if (process.argv[2] == 'idle') {
    curzs.idle()
}
if (process.argv[2] != 'idle' && process.argv[2] != null) {
    curzs.interpreter(process.argv[2])
}