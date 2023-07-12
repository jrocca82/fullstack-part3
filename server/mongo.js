const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://loluvulol:${password}@cluster0.mre1f5x.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phone book:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
  return;
}

if (process.argv.length < 5) {
  console.log("give new entry name and number as arguments");
  process.exit(1);
}

const name = process.argv[3];

const number = process.argv[4];

const newPerson = new Person({
  name: name,
  number: number,
});

newPerson.save().then((result) => {
  console.log(`added ${name} number ${number} to phone book`);
  mongoose.connection.close();
});
