// // npm init -y
// // npm i express
// // npm i hbs
// // npm i nodemon -g >> if it doesn't work: open widows power shell and write Set-ExecutionPolicy RemoteSigned -Scope CurrentUser >> enter >> Y >> enter >> close power shell & reopen visual studio
// // ctrl + c >> to stop terminal, then:
// // nodemon src/server.js -e js,hbs
// // npm i request
// // express >> framework

// http://localhost:3000/


const request = require("request")

// const url = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e1262e0936654b1687692c6bfc819add"
var data = {}
var length = 0
const url = "https://newsdata.io/api/1/news?apikey=pub_1125449eb8f59ee89d7885074d2eb4bf48bde"
request({url, json:true}, (error, response)=>{
    // console.log(response.body.results)
    if(error){
        console.log("Error")
    }
    else if(response.body.results.message){
        console.log(response.body.results.message)
    }
    else{
        data = response.body.results
        length = response.body.totalResults
    }
})
// console.log(length)


const { application } = require("express");

const hbs = require("hbs")
const path = require("path")
const express = require("express")
const app = express()

const x = path.join(__dirname, "../public")
const x_views_path = path.join(__dirname, "../templates/views")
const x_partials_path = path.join(__dirname, "../templates/partials")

const port = process.env.PORT || 3000

// static files  >> .html / .js / etc.
app.use(express.static(x))

// Dynamic files >> .hbs
app.set("view engine", "hbs")
app.set("views", x_views_path)

hbs.registerPartials(x_partials_path)

// http://localhost:3000
app.get("/", (req,res)=>{
    res.render("index",{
        h1:"News",
        data
    })
})

app.listen(port, ()=>{
    console.log("app listening on port example" + port)
})

// node src/server.js

