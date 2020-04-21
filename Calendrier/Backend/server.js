const express = require("express")
const mongoose = require("mongoose")
const requireDir = require("require-dir")
const cors = require("cors")

console.log("Server started")

const server = express()
server.use(express.json())
server.use(cors())

//Iniciar o DB
mongoose.connect(
    /* LocalHost Mongo Server:
    "mongodb://localhost:27017/calendrierApi",
    */
   
    //mongodb atlas:
    "mongodb+srv://mongoCalendrier:mongoCalendrier@mongocalendrier-tksjk.gcp.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

requireDir("./src/models")

//Rotas
server.use("/api", require("./src/routes.js"))
server.listen(3001)
