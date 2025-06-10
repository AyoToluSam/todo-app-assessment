import { useState } from "react";
import { useTodos } from "./todos";

export const initialProjects = [
  {
    id: 1,
    projectName: "Website Redesign",
    createdBy: "John Doe",
  },
  {
    id: 2,
    projectName: "Mobile App Development",
    createdBy: "John Doe",
  },
  {
    id: 3,
    projectName: "Database Migration",
    createdBy: "John Doe",
  },
  {
    id: 4,
    projectName: "Content Strategy",
    createdBy: "John Doe",
  },
  {
    id: 5,
    projectName: "User Research",
    createdBy: "John Doe",
  },
];

export const useProjects = (user) => {
  const [projects, setProjects] = useState(initialProjects);
  const { todos, delTodo } = useTodos(user);

  const addProject = (projectName) => {
    const newProject = {
      id: projects.length + 1,
      projectName,
      createdBy: user.name,
    };
    setProjects([...projects, newProject]);
  };

  const deleteProject = (projectId) => {
    const projectTodos = todos.filter((todo) => todo.projectId === projectId);
    projectTodos.forEach((todo) => delTodo(todo.id));
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return { projects, addProject, deleteProject };
};
