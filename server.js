const express = require("express")
const configureFunc = require("./middleware/ConfigureAPI")
const restricted = require("./middleware/restrict");



//Creates Server
const server = express()
//Configs **Json**Helmet**corse**
configureFunc(server)

server.get("/", req, res => {
    res.status(200).send("<h3>It was 1942 when they took my mother, hung my sister, and burned the feilds....Wrath will not sleep until evil pays it's price </h3>")
})





