/* 
Mathilda Hutchings huma24ey@student.ju.se
Lidiia Yurkevych yuli24of@student.ju.se

Project Web Dev Fun - 2025

Administrator login: admin
Administrator password: wdf#2025
*/

// --- SETUP SERVER
const express = require('express'); // load express package
const {engine}=require('express-handlebars') // load handlebars package 
const sqlite3=require('sqlite3'); // read the sqlite3 package
const session = require('express-session');
const connectSqlite3 = require('connect-sqlite3');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

const adminPassword='$2b$12$VlMqUd/bZkT9oDf20pEt7evv1si.TAPbs53kmEa90DSn0uLxMNYk2';



app.use(express.static('public'));

// FOR THE LIGIN FORM
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// HANDLEBARS
app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars'); 
app.set('views', './views');


// connect to DATABASE
const dbFile='my-project-db.sqlite3.db';
db = new sqlite3.Database(dbFile);
//  STORE SESSION
const SQLiteStore = connectSqlite3(session);
// DEFINE THE SESSION
app.use (session ({
    store: new SQLiteStore ({ db: "session db.db"}),
    "saveUninitialized": false,
    "resave": false,
    "secret": "This123IS@Another#345GreatSecret987%Sentence"
}))

// MAKE THE SESSION AVAILABLE IN ALL HANDLEBARS FILES AT ONCE
app.use((request,response,next) =>{
    response.locals.session = request.session
    next()
})
// LOGIN FORM
app.get('/login', (request,response) => {
    response.render ('login')
})


 // LOGIN PROCESSING
app.post('/login', (request, response) => {
    console.log(`Here comes the data received from the form on the client: ${request.body.un} - ${request.body.pw}`);
    db.get('SELECT * FROM Member WHERE username=?', [request.body.un], (err,theUser) => {
        console.log(JSON.stringify(theUser))
        if(err) {
            console.log('Error in login');
            const model = { error: "Error in login." };
            return response.render('login', model);
        } else if (typeof theUser !== 'undefined') {
            bcrypt.compare(request.body.pw, theUser.Password, (err, result) => {
                if (err) {
                    console.log('Error in password comparison');
                    const model = { error: "Error in password comparison." };
                    response.render('login', model);
                }

                if (result) {
                    request.session.isLoggedIn = true;
                    request.session.un = theUser.username;
                    request.session.isAdmin = (theUser.username=='admin')

                    console.log('> SESSION INFORMATION:', JSON.stringify(request.session));
                response.render('loggedin');
                } else {
                    console.log('Wrong password');
                    const model = { error: "Wrong password! Please try again." };
                    response.render('login', model);
                }
            });
        } else {
            console.log('Error in login');
            const model = { error: "Error in login." };
            response.render('login', model);
        }
    })
    // if (request.body.un === "admin") {
    //     bcrypt.compare(request.body.pw, adminPassword, (err, result) => {
    //         if (err) {
    //             console.log('Error in password comparison');
    //             const model = { error: "Error in password comparison." };
    //             return response.render('login', model);
    //         }

    //         if (result) {
    //             request.session.isLoggedIn = true;
    //             request.session.un = request.body.un;
    //             request.session.isAdmin = true;

    //             console.log('> SESSION INFORMATION:', JSON.stringify(request.session));
    //          response.render('loggedin');
    //         } else {
    //             console.log('Wrong password');
    //             const model = { error: "Wrong password! Please try again." };
    //          response.render('login', model);
    //         }
    //     });
    // } else {
    //     console.log('Wrong username');
    //     model = { error: "Wrong username! Please try again." };
    //     response.render('login', model);
    // }
});

// LOGOUT PROCESSING
app.get('/logout', (req,res) => {
    req.session.destroy ( (err) => {
        if (err) {
            console.log ("Error while destroying the session : " , err)
            res.redirect('/')
        } else {
            console.log('Logged out...')
            res.redirect('/')

        }
    })
})


// --- DEFINE THE ROUTES AND DEFAULT ROUTE
// define the DEFAULT '/' ROUTE
app.get('/', (request, response) => {
    // res.render ('home.handlebars')
    response.render('home')
})

// rest if the page routes
app.get('/about', (req, res) => {
    res.render('about')
})

// app.get('/books', (req, res) => {
//     res.render('books')
// })

app.get('/books', (req, res) => {
    db.all('SELECT * FROM AuthorHasBooks', (error, theBooks) => {
        if (error) {
            res.render('error.handlebars');
        }
        // } else {
        //     // theBooks.forEach(element => {
        //     //     console.log(element);
        //     // });
        //     res.render('books.handlebars', { books: theBooks })
        // }

    //    db.all('SELECT * FROM Author', (error, theAuthors) => {
    //     if (error) {
    //         res.render('error.handlebars');
    //     }
        // } else {
        //     // theBooks.forEach(element => {
        //     //     console.log(element);
        //     // });
            res.render('books.handlebars', {books: theBooks, authors: theAuthors });
        });
    })

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/my_pages', (req, res) => {
    res.render('my_pages')
})

function hashPassword (pw, saltRounds) {
    bcrypt.hash (pw, saltRounds, function (err, hash){
        if (err) {
            HTMLFormControlsCollection.log('--->Error hashing password:',err);
        } else {
            console.log (`---> Hashed password:${hash}`);
        }
    });
}

app.listen(port, () => {
    hashPassword("wdf#2025", 12); 
    console.log(`Server running on http://localhost:${port}`)
})