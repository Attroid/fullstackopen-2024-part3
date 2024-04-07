const Persons = (props) => {
  const filteredPersons = props.persons.filter((person) =>
    person.name.toLowerCase().includes(props.filter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.onDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
