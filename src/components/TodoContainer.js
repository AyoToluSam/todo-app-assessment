import React, { useState } from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { useTodos } from "../constants/todos";
import Projects from "./Projects";

const TodoContainer = ({ user }) => {
  const {
    todos,
    addTodoItem,
    delTodo,
    handleChange,
    assignTo,
    addTag,
    removeTag,
    addDueDate,
  } = useTodos(user);

  const [isProjectTab, setIsProjectTab] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="container">
      <Header />
      <div className="tabs">
        <button
          className={`tab ${!isProjectTab ? "active" : ""}`}
          onClick={() => setIsProjectTab(false)}
        >
          Todos
        </button>
        <button
          className={`tab ${isProjectTab ? "active" : ""}`}
          onClick={() => setIsProjectTab(true)}
        >
          Projects
        </button>
      </div>
      {isProjectTab ? (
        <Projects
          todos={todos}
          addTodoItem={addTodoItem}
          handleChange={handleChange}
          delTodo={delTodo}
          assignTo={assignTo}
          addTag={addTag}
          removeTag={removeTag}
          addDueDate={addDueDate}
        />
      ) : (
        <div>
          <InputTodo addTodoProps={addTodoItem} />
          <div className="search-container">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
          </div>
          <TodosList
            todos={filteredTodos}
            handleChangeProps={handleChange}
            deleteTodoProps={delTodo}
            assignTo={assignTo}
            addTag={addTag}
            removeTag={removeTag}
            addDueDate={addDueDate}
          />
        </div>
      )}
    </div>
  );
};

export default TodoContainer;
