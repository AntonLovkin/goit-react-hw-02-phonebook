import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    name: "",
    number: "",
    filter: "",
  };

  addContact = (name, number) => {
    // console.log(name);
    // console.log(number);

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    // console.log(this.state.contacts.includes(this.state.name));
    // console.log(this.state.name);
    this.setState((prevState) => {
      if (prevState.contacts.includes(this.state.name)) {
        return alert(`${this.state.name} is already in contacts`);
      }
      this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts],
      }));
    });
  };

  handleChangeNumber = (evt) => {
    this.setState({
      // name: evt.currentTarget.value,
      number: evt.target.numbervalue,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, number } = this.state;

    // console.log(`
    // name: ${name}
    // number:${number}`);

    this.addContact(name, number);
    this.setState({ name: "", number: "" });
    this.reset();
  };

  changeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value });
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number, filter } = this.state;

    const normalizedFilter = this.state.filter.toLocaleLowerCase();

    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Phonebook</h2>
        <label>
          Name
          <input
            value={name}
            onChange={this.handleChange}
            placeholder="Name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title=" "
            required
          />
        </label>

        <label>
          Number
          <input
            value={number}
            onChange={this.handleChange}
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>

        <button type="submit">Add contact</button>

        <ul>
          <h3>Contacts</h3>

          <Filter value={filter} onChange={this.changeFilter} />

          {filteredContacts.map(({ name, number, id }) => (
            <li key={id}>
              {name} : {number}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

export default App;
