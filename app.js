const express = require('express')

const app = express()

//const bootstrap = require('bootstrap') 

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap-icons'));

app.set('view engine', 'ejs');

app.get('/requisicion', (req,res)=>{
    res.render('requisicion')
})

app.listen(3000)
console.log('App running on port 3000')