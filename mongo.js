const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
else if (process.argv.length != 3 && process.argv.length != 5) {
  console.log('incorrect amount of arguments. 1 for reading the database, 3 for adding a new person.')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://bieliunasdomantas:${password}@cluster0.1wttvea.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if(process.argv.length == 3){
    Person.find({}).then(result => {
        console.log('phonebook:')

        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })
}
else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

