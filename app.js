const express = require('express')
const cors = require('cors')
const app = express()

const port = 5000

app.listen(port, ()=>{
    console.log(`Puerto conectado en ${port}`)
})


app.use(cors())
app.use(express.json())

//routers

app.use('/api/fotos', require('./routers/router.fotos'))
app.use('/api/user', require('./routers/router.users'))