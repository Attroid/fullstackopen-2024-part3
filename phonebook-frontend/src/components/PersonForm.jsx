import { useState } from "react";

const PersonForm = (props) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();
    props.onSubmit(newName, newNumber);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(ev) => setNewName(ev.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
