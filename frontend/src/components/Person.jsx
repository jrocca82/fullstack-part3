import React, { useState } from "react";
import { deleteItem } from "../backend/Axios";

const Person = ({ person, persons, setPersons, setErrorMessage }) => {
  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      deleteItem(person.id, { name: undefined, number: undefined }).catch(
        (e) => {
          setErrorMessage(`Cannot delete ${person.name}`);
          console.log("fail", e);
        }
      );
      setPersons(persons.filter((person) => person.name !== undefined));
    }
  };

  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  );
};

export default Person;
