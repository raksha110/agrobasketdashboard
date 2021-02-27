var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();
const portno = 3000;

const route = require("./routes/route");
// const connectionString = "mongodb://localhost:27017/covidpredictor"
const connectionString = "mongodb+srv://admin:admin@cluster0.zw4bg.mongodb.net/agrobasket?retryWrites=true&w=majority"

;(async () => {
    const connector = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false })
    console.log('connected')
})()

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/", route);
app.use(express.static(path.join(__dirname, "public")));

app.listen(portno, ()=>{
    console.log("Server started at port " + portno)
});