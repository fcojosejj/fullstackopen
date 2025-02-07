const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fcojosejordanjimenez:${password}@part3phonebook.hbomw.mongodb.net/?retryWrites=true&w=majority&appName=part3phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`${result.name} saved in the phonebook!`)
        mongoose.connection.close()
    })
} else {
    Person.find().then(persons => {
        if (persons.length === 0) {
            console.log('the phonebook is empty')
            mongoose.connection.close()
            return
        }
        console.log("phonebook: ")
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}