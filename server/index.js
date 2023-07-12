const { config } = require("dotenv");
config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.static("../backend"));
app.use(cors());
app.use(bodyParser.json());

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/info", async (req, res) => {
  const currentDate = new Date();
  const people = await Person.find({});

  res.send(
    `<p>Phonebook has info for ${people.length} people.</p><p>${currentDate}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = people.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  people = people.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId = people.length > 0 ? Math.max(...people.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or number missing",
    });
  }

  people.forEach((person) => {
    if (person.name === body.name) {
      return res.status(400).json({
        error: "Person already exists in phonebook.",
      });
    }
  });

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  people = people.concat(newPerson);

  res.json(body);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
