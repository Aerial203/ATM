const readline = require("readline")

module.exports = class CommandLine {
    static ask(question) {
        const r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return new Promise(resolve => {
            r1.question(`${question}`, answer => {
                resolve(answer)
                r1.close()
            })
        })
    }

    static print(text) {
        console.log(text)
    }

}