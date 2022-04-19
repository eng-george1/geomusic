const express = require("express");
const userrouters = require("./routers/userrouters");
const songrouters = require("./routers/songrouters");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

console.log(process.env.TOKEN_EXPIRE );

app.use(express.urlencoded({ extended: true }));
app.use("/users", userrouters);
app.use("/songs", songrouters);


// app.use("/", (req, res) => {
//   res.status(504).send("No API supported");
// });

app.listen(process.env.PORT || 3000, () => console.log("listening to 3000..."));
