const { count } = require('console')

const nodeJs = {
    fs : require('fs')
    ,
    prompt : require('prompt-sync')({sigint: true})
    ,
    process : require('process')
    ,
    keycode : require('keycode')
}
const curzs =
{
    build: 5
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
    event: null
    ,
    variables: {}
    ,
    pointers: {}
    ,
    pointers2: {}
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
        if (tokens[0] == 'help' && tokens[1] == '[curzs];') {
            return `[CURZS MANUAL]\n[There's is some functions that you need to install by using receive command.]\n[1] [receive] [ex. receive [basics.clib]; ]\n[2] [off] [ex. off [curzs]; ]\n[3] [help] [ex. help [curzs]; ]\n[4] [give] [ex. give variable-or-just-text; ]\n[5] [ignore] [ex. ignore [curzs]; ]\n[6] [type] [ex. type [string] [variable-or-just-text] [Hello-World!]; ex. 2 type [number] [money] [500]; ex. 3 type [pointer] [pointer-name] [add_[68,1]]; ]\n[7] [point] [ex. point [pointer-name]; ]\n[8] [once] [ex. once [js]; ]\n[9] [add] [ex. add [68,1]; ]\n[10] [sub] [ex. sub [1,2]; ]\n[11] [mult] [ex. mult [3,5]; ]\n[12] [div] [ex. div [1,20]; ]`
        }
        if (tokens[0] == 'give' && tokens[1]) {
            const text = tokens[1].replace(';','').toString()
            if (text in this.variables) {
                return this.variables[text]
            } else {
                const split = text.split('~')
                let result
                for (;count < (split.length);) {
                    result = split[count].toString() + split[count + 1].toString()
                    count++
                }
                return result
            }
        }
        if (tokens[0] == 'multInput' && tokens[1] && tokens[2]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[1].toString()
                const unChecked2 = tokens[2].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith(']')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const b1 = unChecked2.replace('[','').toString()
                        const b2 = b1.replace('];','').toString()
                        try {
                            this.evaluator(`[CURZS:LINE:${this.line}]:['Created Multiple Input']`)
                            const ask = nodeJs.prompt(a2)
                            this.variables[b2] = ask
                            return `[CURZS:LINE:${this.line}]:['Wrote Text To Variable']`
                        } catch (error) {
                            return `[CURZS:LINE:${this.line}]:['Invalid Prompt']`
                        }
                    }
                }
            } else {
                return `[CURZS:LINE:${this.line}]:['Invalid Function']`
            }
        }
        if (tokens[0] == 'ignore' && tokens[1] == '[curzs];') {
            console.clear()
            return `[CURZS:LINE:${this.line}]:['Cleared Console']`
        }
        if (tokens[0] == 'type' && tokens[1] == '[string]' && tokens[2] && tokens[3]) {
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
                                return `[CURZS:LINE:${this.line}]:['Already Created ${string}']`
                            } else {
                                const unChecked2 = tokens[3].toString()
                                if (unChecked2.startsWith('[') && unChecked2.endsWith('];')) {
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    this.variables[string] = b2
                                    return `[CURZS:LINE:${this.line}]:['Created String: ${string}']`
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
        if (tokens[0] == 'type' && tokens[1] == '[number]' && tokens[2] && tokens[3]) {
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
                                return `[CURZS:LINE:${this.line}]:['Already Created ${number}']`
                            } else {
                                const unChecked2 = tokens[3].toString()
                                if (unChecked2.startsWith('[') && unChecked2.endsWith('];')) {
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    this.variables[number] = parseInt(b2)
                                    return `[CURZS:LINE:${this.line}]:['Created Number: ${number}']`
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
        if (tokens[0] == 'type' && tokens[1] == '[pointer]' && tokens[2] && tokens[3]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[2].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith(']')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2//.replace(';','').toString()
                        const pointer = a3
                        try {
                            if (pointer in this.pointers) {
                                return `[CURZS:LINE:${this.line}]:['Already Created Pointer: ${pointer}']`
                            } else {
                                const unChecked2 = tokens[3].toString()
                                if (unChecked2.startsWith('[') && unChecked2.endsWith('];')) {
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    const b4 = b3.replace('~',' ').toString()
                                    const b5 = b4.replace(',','').toString().split(' ')
                                    const fh = `${b5[0]} ${b5[1]}`
                                    const sh = `${b5[2]} ${b5[3]}`
                                    this.pointers[pointer] = `${fh}`
                                    this.pointers2[pointer] = `${sh}`
                                    return `[CURZS:LINE:${this.line}]:['Created Pointer: ${pointer}']`
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
        if (tokens[0] == 'type' && tokens[1] == '[array]' && tokens[2] && tokens[3]) {
            if (this.packageEnabled.basics == true) {
                const unChecked = tokens[2].toString()
                if (typeof(unChecked) == 'string') {
                    if (unChecked.startsWith('[') && unChecked.endsWith(']')) {
                        const a1 = unChecked.replace('[','').toString()
                        const a2 = a1.replace(']','').toString()
                        const a3 = a2//.replace(';','').toString()
                        const pointer = a3
                        try {
                            if (pointer in this.pointers) {
                                return `[CURZS:LINE:${this.line}]:['Already Created Pointer: ${pointer}']`
                            } else {
                                const unChecked2 = tokens[3].toString()
                                if (unChecked2.startsWith('[') && unChecked2.endsWith('];')) {
                                    const b1 = unChecked2.replace('[','').toString()
                                    const b2 = b1.replace('];','').toString()
                                    const b3 = b2.replace('_',' ').toString()
                                    const b4 = b3.replace('~',' ').toString()
                                    const b5 = b4.replace(',','').toString().split(' ')
                                    const fh = `${b5[0]} ${b5[1]}`
                                    const sh = `${b5[2]} ${b5[3]}`
                                    this.pointers[pointer] = `${fh}`
                                    this.pointers2[pointer] = `${sh}`
                                    return `[CURZS:LINE:${this.line}]:['Created Array: ${pointer}']`
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
                            this.evaluator(`[CURZS:LINE:${this.line}]:['Pointed To ${pointed}']`)
                            this.evaluator(`${this.parser(this.pointers[pointed])}`)
                            return `${this.parser(this.pointers2[pointed])}`
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
                                    const tokens2 = b3.split(' ')
                                    tokens2[0] = tokens2[0]
                                    tokens2[1] = tokens2[1] + ';'
                                    return this.parser(tokens2)
                                } else {
                                    this.evaluator(2)
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
        if (tokens[0] == 'loop' && tokens[1] && tokens[2]) {
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
                                    const tokens2 = b3.split(' ')
                                    tokens2[0] = tokens2[0]
                                    tokens2[1] = tokens2[1] + ';'
                                    return this.parser(tokens2)
                                } else {
                                    this.evaluator(2)
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
        const input = nodeJs.prompt('%>')
        this.singleLine(input)
        this.line++
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
                const codes = file.split('\n')
                const length = codes.length
                this.maxLines = length
                for (;this.line < this.maxLines;) {
                    const tokens = this.lexer(codes[this.line])
                    this.evaluator(this.parser(tokens))
                    this.line += 1
                }
            } catch (error) {
                this.evaluator(`[CURZS:LINE:${this.line}]:['Invalid Path Or File']`)
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
