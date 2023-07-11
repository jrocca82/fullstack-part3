import React from "react";
import Person from "./Person";

const PhonebookList = ({ filter, persons, setPersons, setErrorMessage }) => (
  <>
    <h2>Numbers</h2>
    {filter
      ? persons
          .filter((person) =>
            person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((person) => (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          ))
      : persons.map((person) => (
          <Person
            key={person.id}
            setErrorMessage={setErrorMessage}
            person={person}
            persons={persons}
            setPersons={setPersons}
          />
        ))}
  </>
);

export default PhonebookList;
