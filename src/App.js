import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    contacts: [],
    name: "",
    number: "",
  };

  addContact = (name, number) => {
    console.log(name);
    console.log(number);

    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };
  handleChangeNumber = (evt) => {
    console.log(evt.target.value);

    this.setState({
      // name: evt.currentTarget.value,
      number: evt.target.numbervalue,
    });
  };

  handleChange = ({ target }) => {
    // console.log(evt.currentTarget.numbervalue);
    // console.log(evt.target.value);
    const { name, value } = target;

    this.setState({
      [name]: value,
      // number: evt.currentTarget.numbervalue
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(this.state);
    const { name, number } = this.state;

    console.log(`
    name: ${name}
    number:${number}`);

    this.addContact(name, number);
    this.setState({ name: "", number: "" });
    this.reset();
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { name, number } = this.state;
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

        <ul> </ul>
        <h3>Contacts</h3>
        {console.log(this.state.contacts)}
        {this.state.contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} : {contact.number}
          </li>
        ))}
      </form>
    );
  }
}

export default App;
