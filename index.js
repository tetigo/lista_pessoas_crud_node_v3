const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')


const pessoasRouter = require('./routes/pessoas')

//instancia do sequelize
const model = require('./models/index')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/pessoas', pessoasRouter)

app.get('/',(req,res)=>{
    res.render('home')
})

model.sequelize.sync({force:true})
.then(()=>{
    console.log('sincronizado')
    app.listen(port, ()=>{
        console.log('listening on port ', port)
    })
})
// .finally(()=>sequelize.close())


