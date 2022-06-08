const fileSystem = require("./fileSystem")

module.exports = class Account {
    constructor(name) {
        this.#name = name
    }
    #name
    #balance

    get name() {
        return this.#name
    }

    get balance() {
        return this.#balance
    }

    get filePath() {
        return `accounts/${this.#name}.txt`
    }

    async #load() {
          this.#balance = parseFloat(await fileSystem.read(this.filePath))
    }

    static async find(accountName) {
        const account = new Account(accountName);
        try {
            await account.#load()
            return account
        } catch(e) {
            return 
        }
        
    }

    static async create(accountName) {
        const account = new Account(accountName);
        await fileSystem.write(account.filePath, 0)
        account.#balance = 0
        return account
    }

    async deposit(amount) {
        await fileSystem.write(this.filePath, this.#balance + amount)
        this.#balance += amount
    }

    async withdraw(amount) {
        if (this.#balance >= amount) {
            await fileSystem.write(this.filePath, this.#balance - amount)
            this.#balance -= amount
        } else {
            throw error()
        }
        
    }
}