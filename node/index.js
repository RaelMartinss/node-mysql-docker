const express = require('express')
const { names, uniqueNamesGenerator } = require('unique-names-generator');
const mysql = require('mysql2')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config)

// const sql = `INSERT INTO people(name) values('Martins de sousa')`
// // const sqlname = connection.query(`SELECT * FROM people`)
// connection.query(sql)
// connection.end()

const createPerson = (name) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO people SET ?', { name }, (err) => {
            if (err) {
                console.error(err)
                return reject(err)
            }
            resolve()
        })
    })
}

const getPeople = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM people',(err, results) => {
            if(err) {
                console.error(err)
                return reject(err)
            }
            resolve(results)
        })
    })
    
}

const makePeopleList = (people) => {
    return `<ul>${people.map((item) => `<li>${item.name}</li>`).join('')}</ul>`
}

app.get('/', async (req,res) => {
    const randoName = uniqueNamesGenerator({ dictionaries: [names] });
    await createPerson(randoName)
    const people = await getPeople()
    res.send('<h1>Full Cycle Rocks!</h1>' + makePeopleList(people))
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})