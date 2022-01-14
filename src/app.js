const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express();
const geoCode = require("../src/utils/geocode")
const foreCast = require("../src/utils/forecast")
console.log(__dirname)

//Define Express congig path
const publicDirectoryPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

console.log(publicDirectoryPath)
app.set('view engine', 'hbs')
app.set("views", viewPath)
hbs.registerPartials(partialPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req,res)=> {
    res.render("index",{
        title:"Weather",
        name:"Vinaykumar"
    })

})

app.get("", (req, res) => {
    // console.log(response)
        res.send("<h1>Hello Expresds</h1>")
    })

app.get('/help', (req, res) => {
    res.render('about', {
        title:"Help",
        name:"Vinaykumar",
        src:"img/robot.png"
    })
})

app.get('/about', (req,res) => {

    res.render('about', {
        title:"About Me",
        name:"Shravankumar",
        src:"img/WhatsApp%20Image%202022-01-06%20at%208.05.32%20PM.jpeg"
    })
})
app.get("/help/*", (req, res) =>{
    res.render('404', {
        title:"404",
        name:"Vinaykumar",
        errorMessage:'Help Article Not Found'
    })
})
app.get('/products', (req,res) =>{
    if(!req.query.search) {
        return res.send({
            Error:"Please Provide Name Of The Product"
        })
    } else {
        res.send({
            products: []
        })
    }
})


app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            Note: "Please Provide City Name"
        })
    } else {
      /*  res.send([
            {
                address: req.query.address,
                forecast: "East",
                place: "florida",
                location:{
                    latt: 2.4,
                    lang: 4.6
                }
            },
            {
                address: req.query.address,
                forecast: "West",
                place: "Newyprk",
                location:{
                    latt: 5.4,
                    lang: 2.6
                }
            }
        ])*/
        geoCode(req.query.address, (error,{longitude, latitude, location} = {})  =>{
            if(error){
                res.send({error})
            }
            // else {
            //     res.send({
            //         data
            //     })
            // }
            foreCast(longitude, latitude, (error, foreCastData) => {
                if(error){
                    res.send({error})
                }
                res.send({
                    forecast: foreCastData,
                    location,
                    address: req.query.address,
                })
            })
        })
    }

})
app.get('*', (req,res) =>{
    res.render('404', {
        title:"404",
        name:"Vinaykumar",
        errorMessage:'My 404 Page'
    })
})

app.listen(3001, (req, res) => {
    console.log("serever started", req, res)
})
