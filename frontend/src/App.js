import { useState, useEffect } from "react";
import FilterInput from "./components/FilterInput";
import AddNewForm from "./components/AddNewForm";
import PhonebookList from "./components/PhonebookList";
import { create, getAll, updatePerson } from "./backend/Axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: undefined,
    number: undefined,
  });
  const [filter, setFilter] = useState("");

  const [isAddSuccessful, setIsAddSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newPerson.name || !newPerson.number) {
      return;
    }

    for (let i = 0; i < persons.length; i++) {
      if (newPerson.name.toLowerCase() === persons[i].name.toLowerCase()) {
        const id = persons[i]._id;
        updatePerson({ id, number: newPerson.number });
        setNewPerson({ name: undefined, number: undefined });
        return;
      }
    }

    create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response));
        setIsAddSuccessful(true);
        setTimeout(() => {
          setIsAddSuccessful(true);
        }, 5000);
      })
      .catch((e) => {
        setErrorMessage(`Error adding ${newPerson.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });

    setNewPerson({ name: undefined, number: undefined });
  };

  useEffect(() => {
    getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((e) => console.log("fail", e));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterInput filter={filter} setFilter={setFilter} />
      {isAddSuccessful && (
        <h2 className="successMessage">Successfully added {newPerson.name}</h2>
      )}
      {errorMessage && <h2 className="errorMessage">{errorMessage}</h2>}
      <AddNewForm
        newPerson={newPerson}
        setNewPerson={setNewPerson}
        onSubmit={onSubmit}
      />
      <PhonebookList
        filter={filter}
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
