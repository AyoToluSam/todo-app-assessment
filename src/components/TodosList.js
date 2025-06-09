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
  } = props;
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChangeProps={handleChangeProps}
          deleteTodoProps={deleteTodoProps}
          assignTo={assignTo}
          addTag={addTag}
          removeTag={removeTag}
        />
      ))}
    </div>
  );
};

export default TodosList;
