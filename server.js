const express = require("express");

const app = express();
app.use(express.json());

require("./config/dbConnect");

app.use("/auth", require("./routers/authRouter"));
app.use("/students", require("./routers/studentRouter"));

app.listen(4000, () => console.log("Server up and running successfully !"));
