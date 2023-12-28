var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const router = require("./Routes/Route")
const bodyParser = require('body-parser')
var app = Express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30", extended: true }));
app.use('/',router)


async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Todo"); //Todo is databasename
}
main()
  .then(() => console.log("DB installed successfully"))
  .catch((err) => console.log(err));
// var CONNECTION_STRING="mongodb+srv://Admin:sarath8787@cluster0.ukvmqek.mongodb.net/?retryWrites=true&w=majority";

// var DATABASENAME="todoappdb";
// var database;

// app.listen(5038,()=>{
//     Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
//         database=client.db(DATABASENAME);
//         console.log("MONGO DB CONNECTION ESTABLISHED");
//     })
// })
app.listen(3001, () => {
  console.log("server started in http://localhost:3001 !!");
});


