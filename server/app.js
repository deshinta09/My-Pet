if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.port || 3000
const router = require('./router/')
const errors = require('./middleware/error')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(router)

app.use(errors)

app.listen(port,()=>console.log(`listen on port ${port}`))
