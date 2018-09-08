const express = require("express");
const data = require("./data/data.json");

const app = express();
const port = process.env.PORT || 5000;

app.get("/api/table", (req, res) => {
  res.send({ data: data });
});

app.get("api/data", (req, res) => {});

app.listen(port, () => console.log(`Listening on port ${port}`));
