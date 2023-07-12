import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const updatePerson = (person) => {
  if (
    window.confirm(
      `${person.name} is already added to the phone book, would you like to replace their old number with a new one?`
    )
  ) {
    update(person.id, { name: person.name, number: person.number }).catch((e) =>
      console.log("fail", e)
    );
  }
};

const deleteItem = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export { getAll, create, update, updatePerson, deleteItem };
