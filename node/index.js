const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO peoples(name) values('Martins de sousa')`
const sqlname = connection.query(`SELECT * FROM peoples`)
connection.query(sql)
connection.end()


app.get('/', async (req,res) => {
    res.send('<h1>Full Cycle DevOps@!!!!</h1>' + '<p>' + sqlname + '</p>')
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})