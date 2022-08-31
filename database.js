const mongoose = require('mongoose')

URI = 'mongodb+srv://jose:mSRzUEU3pWe973Pf@cluster0.rvntqrq.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URI)

const connection= mongoose.connection

connection.once('open', ()=>{
    console.log('database is connected')
})