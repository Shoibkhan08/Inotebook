const connectDB = require('./db');
const express = require('express')

connectDB
const app = express()
const port = 5000;
const cors = require('cors')

app.use(express.json())

//Available routes
app.use(cors())
app.use("/api/auth",require('./routes/Auth'))
app.use("/api/notes",require('./routes/Notes'))


app.listen(port,()=>{
  console.log(`Example app listening at http://localhost:${port}`)
})
// app.listen(3000)