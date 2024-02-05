import React, { useState, useEffect } from "react";


const Home = () => {
  const [newItem, setNewItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the submitted item
    console.log("Submitted item:", newItem);
  };

  return (
    <div className="todo-list">
      <div className="title">
        <h1>Todo List</h1>
        <span>Get things done, one item at a time.</span>
        <div className="todos-content">content
          <li>
            <div class="actions">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                <label class="form-check-label" for="inlineCheckbox1">1</label>
                <button class="btn-picto" type="button" aria-label="Delete" title="Delete">
                  <i class="far fa-trash-alt"></i>
                </button>
            </div>
          </li>
        </div>
        <div className="input-todo">
          <form name="newform" onSubmit={handleSubmit}>
            <label htmlFor="newitem">Add to the todo list</label>
            <input
              type="text"
              name="newitem"
              id="newitem"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;