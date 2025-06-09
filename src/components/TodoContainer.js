import React, { useState } from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
import { useTodos } from "../constants/todos";
import Projects from "./Projects";

const TodoContainer = ({ user }) => {
  const {
    todos,
    // setTodos,
    addTodoItem,
    delTodo,
    handleChange,
    assignTo,
    addTag,
    removeTag,
  } = useTodos(user);

  const [isProjectTab, setIsProjectTab] = useState(false);

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
        />
      ) : (
        <div>
          <InputTodo addTodoProps={addTodoItem} />
          <TodosList
            todos={todos}
            handleChangeProps={handleChange}
            deleteTodoProps={delTodo}
            assignTo={assignTo}
            addTag={addTag}
            removeTag={removeTag}
          />
        </div>
      )}
    </div>
  );
};

export default TodoContainer;
