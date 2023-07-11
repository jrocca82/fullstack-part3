const AddNewForm = ({ newPerson, setNewPerson, onSubmit }) => (
  <form>
    <h2>Add New:</h2>
    <div>
      name:
      <input
        onChange={(e) => {
          setNewPerson((state) => ({ ...state, name: e.target.value }));
        }}
        value={newPerson.name}
      />
    </div>
    <div>
      phone number:
      <input
        onChange={(e) =>
          setNewPerson((state) => ({ ...state, number: e.target.value }))
        }
        value={newPerson.number}
      />
    </div>
    <div>
      <button onClick={onSubmit} type="submit">
        add
      </button>
    </div>
  </form>
);

export default AddNewForm;
