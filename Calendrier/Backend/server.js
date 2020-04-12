const express = require("express")
const mongoose = require("mongoose")
const requireDir = require("require-dir")
const cors = require("cors")

const server = express()
server.use(express.json())
server.use(cors())

//Iniciar o DB
mongoose.connect(
    "mongodb://localhost:27017/calendrierApi",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

requireDir("./src/models")

//Rotas
server.use("/api", require("./src/routes.js"))
server.listen(3001)
