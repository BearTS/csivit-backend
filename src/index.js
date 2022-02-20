require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connection Successfull!')).catch((err) => {console.log(err); process.exit(); });
const Port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: function(origin, callback){
    // allow requests with no origin 
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

app.use('/api', require('./routes/feedback'));

app.listen(Port, () => {
    console.log('Listening on Port ' + Port);
});