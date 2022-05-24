const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forcast = require('./utils/forcast.js')

const staticFilesPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')



const app = express()
// a port from the environment or 3001
// the port from environment is used when hosting on heroku
const port = process.env.PORT || 3001


// serving static files
// this will add 2 routes to your server /index.html and /main.js 
// and app.get('', ...) will return index.html and will not execute the app.get('', ...) defined below 
app.use(express.static(staticFilesPath))

// which engine to use
app.set('view engine', 'hbs')
// customising the default views path
app.set('views', viewsPath)
// teling the engine where to find partial views
hbs.registerPartials(partialsPath)

// serving dynamic index.hbs file and providing a name variable to it
app.get('', (req, res) => {
    res.render('index', {
        name: "moussa"
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "please provide an address!"
        })
    }

    forcast(req.query.address, (error, response) => {
        if(error) {
            res.send({error})
        } else {
            res.send({response})
        }
    })
})

// a 404 page if any other url requested
app.get('*', (req, res) => {
    res.render('404', {
        title: "4O4 Not Found!",
        msg: "Page Not Found"
    })
})


app.listen(port, () => {
    console.log(`running on port ${port}`)
})
