
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/index')
const { errorHandling } = require('./middleware/errorHandling')
require('dotenv').config()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use('/', routes)

app.use(errorHandling)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//npx sequelize model:create --name User --attributes email:string,username:string,password:string,phoneNumber:string,address:string
//npx sequelize model:create --name Category --attributes name:string
//npx sequelize model:create --name Product --attributes name:string,slug:string,description:string,price:integer,mainImg:string,categoryId:integer,authorId:integer
//npx sequelize model:create --name Image --attributes imgUrl:string,productId:integer