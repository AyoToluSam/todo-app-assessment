import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const initialTodos = [
  {
    id: uuidv4(),
    title: "Setup development environment",
    completed: true,
    createdBy: "John Doe",
    assignedTo: 1,
    tags: ["work", "personal"],
    project: "Website Redesign",
  },
  {
    id: uuidv4(),
    title: "Develop website and add content",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 3,
    tags: ["urgent"],
    project: "Refactor TypeScript",
  },
  {
    id: uuidv4(),
    title: "Deploy to live server",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 4,
    tags: ["critical", "work"],
    project: "Create API Documentation",
  },
];

export const useTodos = () => {
  const [todos, setTodos] = useState(initialTodos);

  const handleChange = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
      createdBy: "John Doe",
      assignedTo: Math.floor(Math.random() * 4) + 1,
      tags: [],
    };
    setTodos([...todos, newTodo]);
  };

  const assignTo = (id, userId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, assignedTo: userId };
        }
        return todo;
      })
    );
  };

  const addTag = (id, tag) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, tags: [...todo.tags, tag] };
        }
        return todo;
      })
    );
  };

  const removeTag = (id, tag) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, tags: todo.tags.filter((t) => t !== tag) };
        }
        return todo;
      })
    );
  };

  return {
    todos,
    setTodos,
    handleChange,
    delTodo,
    addTodoItem,
    assignTo,
    addTag,
    removeTag,
  };
};
