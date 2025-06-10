import React from "react";
import TodoItem from "./TodoItem";

const TodosList = (props) => {
  const {
    todos,
    handleChangeProps,
    deleteTodoProps,
    assignTo,
    addTag,
    removeTag,
    addDueDate,
  } = props;
  return (
    <div className="todos-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChangeProps={handleChangeProps}
          deleteTodoProps={deleteTodoProps}
          assignTo={assignTo}
          addTag={addTag}
          removeTag={removeTag}
          addDueDate={addDueDate}
        />
      ))}
    </div>
  );
};

export default TodosList;
