import express from "express"

const app = express()

app.get("/users", (request, response) => {
    console.log("listagem de usuarios")

    response.json(["eu", "tu", "ele", "nos", "vos"])
})

app.listen(3001)
