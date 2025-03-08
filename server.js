const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let id = 1;

let items = [];

app.post("/items", (req, res) => {
  const item = { id: id++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id == req.params.id);
  item ? res.json(item) : res.status(404).json({ error: "Item not found" });
});

app.put("/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id == req.params.id);
  if (index !== -1) {
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.delete("/items/:id", (req, res) => {
  items = items.filter((i) => i.id != req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
