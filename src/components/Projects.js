import React, { useState } from "react";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";

const Projects = ({
  todos,
  addTodoItem,
  handleChange,
  delTodo,
  assignTo,
  addTag,
  removeTag,
}) => {
  const projectGroups = todos.reduce((acc, todo) => {
    if (todo.project) {
      if (!acc[todo.project]) {
        acc[todo.project] = [];
      }
      acc[todo.project].push(todo);
    }
    return acc;
  }, {});

  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <div className="project-tab">
      <h2>Projects</h2>
      {Object.keys(projectGroups).length === 0 ? (
        <p>No projects available.</p>
      ) : (
        Object.entries(projectGroups).map(([projectName, projectTodos]) => (
          <div key={projectName} className="project-group">
            <h3
              onClick={() =>
                setOpenAccordion(
                  openAccordion === projectName ? null : projectName
                )
              }
            >
              {projectName}{" "}
              <span style={{ rotate: openAccordion ? "180deg" : 0 }}>
                {" "}
                {"🔽"}
              </span>
            </h3>
            {openAccordion && openAccordion === projectName && (
              <div>
                <InputTodo addTodoProps={addTodoItem} />
                <TodosList
                  todos={projectTodos}
                  handleChangeProps={handleChange}
                  deleteTodoProps={delTodo}
                  assignTo={assignTo}
                  addTag={addTag}
                  removeTag={removeTag}
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
export default Projects;
