const express = require('express')
const app = express()
const port = 3000
const rootRouter = require ('./routes/root')
 
app.use(express.json())

app.use('/api/v1', rootRouter)

app.listen(port,() =>
 {console.log('listenig on port ${port}')
})