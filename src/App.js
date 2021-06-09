import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    contacts: [],
    name: "",
  };

  handleChange = (evt) => {
    this.setState({
      name: evt.currentTarget.value,
    });
  };

  addContact = (name) => {
    console.log(name);

    const contact = {
      id: uuidv4(),
      name,
    };
    this.setState((prevState) => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log(this.state);

    this.addContact(this.state.name);

    this.setState({ name: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Phonebook</h2>
        <label>
          Name
          <input
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title=" "
            required
          />
        </label>
        <button type="submit">Add contact</button>

        <ul>Contacts</ul>
        {console.log(this.state.contacts)}
        {this.state.contacts.map((contact) => (
          <li key={contact.id}>{contact.name}</li>
        ))}
      </form>
    );
  }
}

export default App;
