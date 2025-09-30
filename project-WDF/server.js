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


// FROM WORKSHOP, SHOULD CREATE OUR OWN IN SQLite3 db file
// creates table Person at startup
db.run(`CREATE TABLE Person (pid INTEGER PRIMARY KEY, fname TEXT NOT NULL, lname
TEXT NOT NULL, age INTEGER, email TEXT)`, function (error) {
if (error) {
// tests error: display error
console.log("---> ERROR: ", error)
} else {
// tests error: no error, the table has been created
console.log("---> Table created!")
db.run(`INSERT INTO Person (fname, lname, age, email) VALUES ('John',
'Smith', 25, 'john.smith@example.com'), ('Jane', 'Doe', 30, 'jane.doe@mail.com'),
('Alex', 'Johnson', 40, 'alex.johnson@company.com'), ('Emily', 'Brown', 35,
'emily.brown@business.org'), ('Michael', 'Davis', 50, 'michael.davis@email.net'),
('Sarah', 'Miller', 28, 'sarah.miller@example.com'), ('David', 'Garcia', 45,
'david.garcia@mail.com'), ('Laura', 'Rodriguez', 32,
'laura.rodriguez@company.com'), ('Chris', 'Wilson', 27,
'chris.wilson@business.org'), ('Anna', 'Martinez', 22, 'anna.martinez@email.net'),
('James', 'Taylor', 53, 'james.taylor@example.com'), ('Patricia', 'Anderson', 44,
'patricia.anderson@mail.com'), ('Robert', 'Thomas', 38,
'robert.thomas@company.com'), ('Linda', 'Hernandez', 55,
'linda.hernandez@business.org'), ('William', 'Moore', 26,
'william.moore@email.net'), ('Barbara', 'Jackson', 37,
'barbara.jackson@example.com'), ('Richard', 'White', 49, 'richard.white@mail.com'),
('Susan', 'Lee', 24, 'susan.lee@company.com'), ('Joseph', 'Clark', 41,
'joseph.clark@business.org'), ('Jessica', 'Walker', 29,
'jessica.walker@email.net');` , function (err) {
if (err) {
console.log(err.message)
} else {
console.log('---> Rows inserted in the table Person.')
}
})
}
})

app.get('/rawpersons', function (req, res) {
    db.all('SELECT * FROM Person', function (err, rawPersons) {
        if (err) {
            console.log('Error: '+err)
        } else {
            console.log('Data found, sending it back to the client...')
            res.send(rawPersons)
        }
    })
})

app.get('/listpersons', function (req, res) {
    db.all('SELECT * FROM Person', function (err, rawPersons) {
        if (err) {
            console.log('Error: '+err)
        } else {
            listPersonsHTML='<ul>'
            rawPersons.forEach( function (onePerson) {
                listPersonsHTML+='<li>'
                listPersonsHTML+=`${onePerson.fname}, `
                listPersonsHTML+=`${onePerson.lname}, `
                listPersonsHTML+=`${onePerson.age}, `
                listPersonsHTML+=`${onePerson.email}, `
                listPersonsHTML+='</li>'
            })
            listPersonsHTML+='</ul>'
            res.send(listPersonsHTML)
        }
    })
})

app.listen(port, () => {
    console.log(`Server up and running on http://localhost:${port}...`)
})