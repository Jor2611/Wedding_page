/**
 * Created by Jora Khachatran on 6/25/2017.
 */
const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const handlebars = require('express-handlebars');
const bodyParser=require('body-parser');
const app=express();

const routes = require('./routes/index');
const config = require("./config/configs");


//Connecting to database
const db = mongoose.connection;
mongoose.connect(config.mongodbUri,{ useNewUrlParser: true });

//Checking connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Server Connected to DB...."+new Date());
});


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(config.port, function(){
    console.log(`Server running on port ${config.port}`);
});



