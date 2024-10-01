const express = require ('express')
const cors = require ('cors')
const db = require ('./models')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/' , require('./routes/main'))

db.sequelize.sync().then(()=>{
    app.listen(PORT , ()=>{console.log(`server is running on PORT : ${PORT}`)})
})