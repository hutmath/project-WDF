/* 
Mathilda Hutchings huma24ey@student.ju.se
Lidiia Yurkevych yuli24of@student.ju.se

Project Web Dev Fun - 2025

Administrator login: admin
Administrator password: xxxx
*/

// --- LOAD THE PACKAGES
const express=require('express')
const {engine}=require('express-handlebars') // load the ahndlebars package for express

// --- DEFINE VARIABLES AND CONSTANTS
const port=8080
const app=express()
// here or below??? in connect to database?
const sqlite3=require('sqlite3') // read the sqlite3 package

// --- DEFINE MIDDLEWARES
app.use(express.static('public'))
app.engine('handlebars', engine()) // initialize the engine to be handlebars
app.set('view engine', 'handlebars') // set handlebars as the view engine
app.set('views', './views') // define the views directory to be ./views

// --- CONNECT TO DATABASE
/* I don't know where to have these, if they should be where they are now, or in here
const sqlite3=require('sqlite3') // read the sqlite3 package ????
or
const dbFile='my-project-db.sqlite3.db'
*/

// --- DEFINE THE ROUTES AND
// define the default '/' ROUTE
app.get('/', (request, response) => {
    // res.render ('home.handlebars')
    response.render('home')
})

app.get('/books', (req, res) => {
    res.render('books.handlebars')
})
// OR
/*

app.get('/', (request, response) => {
    // res.render ('home.handlebars')
    response.render('home.handlebars') // here's the change!
})

*/


// here or above??? in connect to database?
const dbFile='my-project-db.sqlite3.db'

db = new sqlite3.Database(dbFile)

app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}...`)
})