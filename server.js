const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express();

// Bodyparser
// app.use(bodyParser.json())  note: latest version of express include bodyParser so no need to include seperately, instead use express.json
app.use(express.json())

//MongooseDB config
const db = config.get('mongoURI');

const con_fig = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

// Connect to Database Mongoose
mongoose
    .connect(db, con_fig)
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err))

//Use Routes item-> add from react  users-> for registration   auth-> for login
app.use('/api/items', require('./Routes/api/items'))
app.use('/api/users', require('./Routes/api/users'))
app.use('/api/auth', require('./Routes/api/auth'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))

