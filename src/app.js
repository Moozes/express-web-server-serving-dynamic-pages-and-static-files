const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forcast = require('./utils/forcast.js')

const staticFilesPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')



const app = express()

app.use(express.static(staticFilesPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        name: "moussa"
    })
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

app.get('*', (req, res) => {
    res.render('404', {
        title: "4O4 Not Found!",
        msg: "Page Not Found"
    })
})


app.listen(3000, () => {
    console.log("3000")
})
