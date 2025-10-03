/* 
Mathilda Hutchings huma24ey@student.ju.se
Lidiia Yurkevych yuli24of@student.ju.se

Project Web Dev Fun - 2025

Administrator login: admin
Administrator password: xxxx
*/

// --- SETUP SERVER
const express=require('express') // load express package
// define variables and constants
const app=express()
const port=8080

// --- HANDLEBARS
const {engine}=require('express-handlebars') // load handlebars package (for express)
// setup handlebars // define middlewares
app.use(express.static('public'))
app.engine('handlebars', engine()) // initialize the engine to be handlebars
app.set('view engine', 'handlebars') // set handlebars as the view engine
app.set('views', './views') // define the views directory to be ./views

// --- SQLITE3
const sqlite3=require('sqlite3') // read the sqlite3 package
// connect to database
const dbFile='my-project-db.sqlite3.db'
db = new sqlite3.Database(dbFile)


// --- DEFINE THE ROUTES AND DEFAULT ROUTE
// define the default '/' ROUTE
app.get('/', (request, response) => {
    // res.render ('home.handlebars')
    response.render('home')
})

app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}...`)
})