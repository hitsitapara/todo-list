const express = require("express");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // temporary add * in cors policy 

app.use("/api/todos", todoRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});


module.exports = app;
