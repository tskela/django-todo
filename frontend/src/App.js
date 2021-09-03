// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react"
import Modal from "./components/Modal";
import axios from "axios";

// const todoItems = [
//   {
//     id: 1,
//     title: "Nature walk in the park",
//     description: "Visit the park with my friends",
//     completed: true
//   },

//   {
//     id: 2,
//     title: "Visit",
//     description: "Got to my aunt's place",
//     completed: true
//   },

//   {
//     id: 3,
//     title: "Write",
//     description: "Do an article about anthropology",
//     completed: true
//   },
// ]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
      modal: false,
    }
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/todos/');
      const todoList = await res.json();
      this.setState({
        todoList
      })
    }
    catch (e) {
      console.log(e)
    }
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}`, item)
      return;
    }

    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(() => fetch('http://localhost:8000/api/todos/'))
      .then((todos) => todos.json())
      .then((todoList) => this.setState({ todoList }))
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal })
  };

  displayCompleted = status => {
    this.setState({ viewCompleted: status })
  }

  render() {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    )

    const todos = newItems.map(item => (
      <li key={item.id}>
        {this.state.viewCompleted ? "completed-todo" : ""}
        {item.title}
      </li>
    ))

    const modal = this.state.modal ? (
      <Modal
        activeItem={this.state.activeItem}
        toggle={this.toggle}
        onSave={this.handleSubmit}
      />
    ) : null

    return (
      <div>
        <button onClick={this.createItem}>Add Task</button>
        <button
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </button>
        <button
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </button>
        <ul>
          {todos}
        </ul>
        {modal}
      </div>
    )
  };
}

export default App;
