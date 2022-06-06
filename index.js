const fs = require("fs/promises"); // fs means file system built in version
const express = require("express"); // express is a web server
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid} = require("uuid");

const app = express();
// The end point can be localhost:3000/outfit
app.get("/outfit",(req,res) => {
    let tops = ["Black", "Blue", "Orange", "Navy"];
    let jeans = ["Grey","Dark Grey","Black","White"];
    let shoes = ["Grey","Black","White"];
    console.log(_.sample(tops))
    res.json({
        top: _.sample(tops),
        jeans: _.sample(jeans),
        shoes : _.sample(shoes)
    })
})


app.listen(3000, () => {
    console.log("API Server started on port 3000")
})

// const PORT = 3000 || 5000;
// app.listen(PORT, () => {
//     console.log("The server is running on port `${PORT}`");
// })