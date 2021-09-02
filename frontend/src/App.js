// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react"

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
      todoList: []
    }
  }

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
  }

  render() {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    )

    const todos = newItems.map(item => (
      <li>
        {this.state.viewCompleted ? "completed-todo" : ""}
        {item.title + ": "}
        {item.description}
      </li>
    ))

    return (
      <ul>
        {todos}
      </ul>
    )
  };
}

export default App;
