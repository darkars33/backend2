const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectToDB= require('./db/connectToDB');
const feedbackRoute = require('./routes/feedback.route');
const userAuthRoute = require('./routes/userAuth.route');
const eventRoute = require('./routes/event.route');

dotenv.config();

const app = express();
const PORT  = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
          origin: '*',
          methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
}))
app.use('/api', feedbackRoute);
app.use('/api/auth', userAuthRoute);
app.use('/api', eventRoute);


app.get('/', (req, res) =>{
          res.send('API is running');
})


app.listen(PORT, () =>{
          console.log(`Server is running on port ${PORT}`);
          connectToDB();
})