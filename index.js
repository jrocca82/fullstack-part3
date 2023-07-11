const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')

const app = express();
app.use(express.static('frontend'));
app.use(bodyParser.json());

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

let noOfPeople = people.length;

app.get("/api/persons", (req, res) => {
  res.json(people);
});

app.get("/info", async (req, res) => {
  const currentDate = new Date();

  res.send(
    `<p>Phonebook has info for ${noOfPeople} people.</p><p>${currentDate}</p>`
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
  noOfPeople -= 1;

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

  noOfPeople += 1;

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  people = people.concat(newPerson);

  res.json(body);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
