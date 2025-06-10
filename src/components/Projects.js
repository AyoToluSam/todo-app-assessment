import React, { useState } from "react";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import { useProjects } from "../constants/projects";
import InputProject from "./InputProject";

const Projects = ({
  user,
  todos,
  addTodoItem,
  handleChange,
  delTodo,
  assignTo,
  addTag,
  removeTag,
}) => {
  const { projects, addProject, deleteProject } = useProjects(user);

  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <div className="project-tab">
      <h2>Projects</h2>
      <InputProject addProject={addProject} />
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        projects.map(({ id, projectName }) => {
          const projectTodos = todos.filter((todo) => todo.projectId === id);
          const isOpened = openAccordion && openAccordion === projectName;
          return (
            <div key={projectName} className="project-group">
              <h3
                onClick={() => setOpenAccordion(isOpened ? null : projectName)}
              >
                {projectName}
                <span style={{ rotate: isOpened ? "180deg" : 0 }}>{"🔽"}</span>
              </h3>
              {isOpened && (
                <div>
                  <InputTodo
                    addTodoProps={(title) => addTodoItem(title, projectName)}
                  />
                  <TodosList
                    todos={projectTodos}
                    handleChangeProps={handleChange}
                    deleteTodoProps={delTodo}
                    assignTo={assignTo}
                    addTag={addTag}
                    removeTag={removeTag}
                  />
                  <div className="delete-project-container">
                    <button
                      className="delete-project"
                      onClick={() => deleteProject(id)}
                    >
                      Delete Project
                    </button>
                    <span>
                      <span role="img" aria-label="Information">
                        ℹ️
                      </span>{" "}
                      Note: This will delete the project and all its todos.
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
export default Projects;
