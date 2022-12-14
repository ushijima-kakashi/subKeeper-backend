const express = require('express');
const app = express();
const mongoose = require('mongoose');
var path = require('path');

require('dotenv').config();
// remove below line before git commit and uncomment above line
// require('dotenv').config({ path: path.join(__dirname, `./.env.dev`)});

const PORT = process.env.PORT || 4000;
const subscriptionRoutes = require('./routes/subscriptionRoutes')


//global middleware
app.use(express.json())

// routes
app.get('/', (req, res)=> res.json({title: "SubKeeper"}))
app.use('/api/subscription', subscriptionRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log( `sun raha hu maiiiiiii, port ${PORT} meeee ` );
        })
    })
    .catch((err) => {
        console.log( err );
    })