const express = require("express");
const router = require("./src/routes")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 3000
process.env.TZ="Asia/Saigon"

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(morgan("combined"))
app.use(cors())
router(app)


app.use((err, req, res, next) => {
    console.log({err});
    res.status(500).send(err.message)
})


app.listen(PORT, () => {
    return "Server is listening on port ${PORT}";
})

