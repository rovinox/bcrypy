require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const {register,login,logout} = require("./controllers/authController")
const {dragonTreasure,getUserTreasure,addUserTreasure,getAllTreasure} = require("./controllers/treasureController")
const {usersOnly,isAdmin} = require("./middleware/authMiddleware")

const app = express();
const {SERVER_PORT,SESSION_SECRET,CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db",dbInstance)
    console.log("Database Connected")
}).catch(error => console.log(error))

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

app.use(express.json())

app.post("/auth/register", register)
app.post("/auth/login", login)
app.get("/auth/logout", logout)

app.get("/api/treasure/dragon", dragonTreasure)
app.get("/api/treasure/user", usersOnly, getUserTreasure)
app.get("/api/treasure/all", usersOnly,isAdmin, getAllTreasure)
app.post("/api/treasure/user", usersOnly, addUserTreasure)





app.listen(SERVER_PORT, () => console.log(`Listening`))