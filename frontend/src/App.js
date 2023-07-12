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
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newPerson.name || !newPerson.number) {
      return;
    }

    for (let i = 0; i < persons.length; i++) {
      if (newPerson.name.toLowerCase() === persons[i].name.toLowerCase()) {
        updatePerson({ ...persons[i], number: newPerson.number })
          .then((res) => {
            setIsUpdateSuccessful(true);
            setTimeout(() => {
              setIsUpdateSuccessful(false);
            }, 3000);
          })
          .catch((e) => {
            setErrorMessage(
              `Error updating ${newPerson.name}. ${e.response.data.error}`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });
        return;
      }
    }

    create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response));
        setIsAddSuccessful(true);
        setTimeout(() => {
          setIsAddSuccessful(false);
        }, 3000);
      })
      .catch((e) => {
        setErrorMessage(
          `Error adding ${newPerson.name}. ${e.response.data.error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
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
        <p className="successMessage">Successfully added {newPerson.name}</p>
      )}
      {isUpdateSuccessful && !errorMessage && (
        <p className="successMessage">
          Successfully updated {newPerson.name}
        </p>
      )}
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
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
