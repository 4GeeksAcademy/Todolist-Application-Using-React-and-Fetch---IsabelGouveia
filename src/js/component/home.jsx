import React, { useState , useEffect } from "react";

const Home = () => {
  // State variables for input text and todo list
  const [inputText, setInputText] = useState("");
  const [listTodo, setListTodo] = useState([]);

  // UseEffect
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      })
      .then(responseAsJson => {
        setListTodo(responseAsJson.map(todo => todo.title));
      })
      .catch(error => {
        console.log('Looks like there was a problem: \n', error);
      });
  }, [])


  const addTodo = () => {
    // Check if input text is not empty
    if (inputText.trim() !== "") {
      // Add input text to the todo list
      setListTodo([...listTodo, inputText]);
      // Clear the input text
      setInputText("");
    }

    // Send POST request to API here
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({ name: inputText }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => console.log('Success:', response))
      .catch(error => console.error(error));
  };

  const deleteTodo = (index) => {
    // Create a copy of the todo list
    const updatedTodoList = [...listTodo];
    // Remove the todo item at the specified index using splice
    updatedTodoList.splice(index, 1);
    // Update the state with the modified todo list
    setListTodo(updatedTodoList);

    // Send POST request to API here
    fetch(`https://jsonplaceholder.typicode.com/comments/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(response => console.log('Success:', response))
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      {/* Heading */}
      <h1>Todo List</h1>

      {/* Todo list */}
      <div className="input-box-container">
        {/* Input field for adding new todos */}
        <input
          className="input-box"
          type="text"
          placeholder="Add item..."
          value={inputText}
          // Update the input text state when the value changes
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Button for adding a new todo */}
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {/* Map over the list of todos */}
        {listTodo.map((item, index) => (
          // Each todo item is rendered as an <li> element with a unique key
          <li key={index}>
            {item}
            <i className="fas fa-trash" onClick={() => deleteTodo(index)}></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;


