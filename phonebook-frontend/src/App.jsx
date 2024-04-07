import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [notificationTimeoutId, setNotificationTimeoutId] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const showNotification = (message, type) => {
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId);
      setNotificationTimeoutId(null);
    }

    setNotificationMessage(message);
    setNotificationType(type);

    const timeoutId = setTimeout(() => {
      setNotificationMessage("");
      setNotificationType("");
      setNotificationTimeoutId(null);
    }, 3000);

    setNotificationTimeoutId(timeoutId);
  };

  const updateUser = (name, number) => {
    const person = persons.find((person) => person.name === name);

    if (
      !window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      return;
    }

    personService
      .update({ ...person, number })
      .then((updatedPerson) => {
        showNotification(`Updated ${updatedPerson.name}`, "success");
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );
      })
      .catch(() => {
        showNotification(
          `Information of ${person.name} has already been removed from server`,
          "error"
        );
        setPersons(persons.filter((p) => p.id !== person.id));
      });
  };

  const addPerson = (name, number) => {
    if (persons.find((person) => person.name === name)) {
      return updateUser(name, number);
    }

    const person = {
      name,
      number,
    };

    personService.create(person).then((createdPerson) => {
      showNotification(`Added ${createdPerson.name}`, "success");
      setPersons(persons.concat(createdPerson));
    });
  };

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) {
      return;
    }

    personService.del(person.id).then((deletedPerson) => {
      setPersons(persons.filter((person) => person.id !== deletedPerson.id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={filter} onChange={(ev) => setFilter(ev.target.value)} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
};

export default App;
