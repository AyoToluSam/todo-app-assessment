import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const initialTodos = [
  {
    id: uuidv4(),
    title: "Setup development environment",
    completed: true,
    createdBy: "John Doe",
    assignedTo: 1,
    dueDate: "2025-06-01",
    tags: ["work", "development"],
    projectId: 1,
    projectName: "Website Redesign",
  },
  {
    id: uuidv4(),
    title: "Develop website and add content",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 3,
    dueDate: "2025-06-12",
    tags: ["urgent"],
    projectId: 1,
    projectName: "Website Redesign",
  },
  {
    id: uuidv4(),
    title: "Deploy to live server",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 4,
    tags: ["critical"],
    projectId: 1,
    projectName: "Website Redesign",
  },
  {
    id: uuidv4(),
    title: "Review website performance",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 2,
    dueDate: "2025-06-05",
    tags: ["testing"],
    projectId: 1,
    projectName: "Website Redesign",
  },
  {
    id: uuidv4(),
    title: "Update documentation",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 1,
    tags: ["documentation"],
    projectId: 4,
    projectName: "Content Strategy",
  },
  {
    id: uuidv4(),
    title: "Fix responsiveness",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 3,
    tags: ["bug", "mobile"],
    projectId: 2,
    projectName: "Mobile App Development",
  },
  {
    id: uuidv4(),
    title: "Implement user feedback",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 2,
    tags: ["enhancement"],
    projectId: 4,
    projectName: "Content Strategy",
  },
  {
    id: uuidv4(),
    title: "Optimize images",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 4,
    tags: ["optimization"],
    projectId: 2,
    projectName: "Mobile App Development",
  },
  {
    id: uuidv4(),
    title: "Setup analytics",
    completed: false,
    createdBy: "John Doe",
    assignedTo: 1,
    tags: ["monitoring"],
    projectId: 4,
    projectName: "Content Strategy",
  },
];

export const useTodos = (user) => {
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

  const addTodoItem = (title, project) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false,
      createdBy: user.fullname,
      assignedTo: null,
      tags: [],
      project,
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

  const addDueDate = (id, dueDate) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, dueDate };
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
    addDueDate,
  };
};
