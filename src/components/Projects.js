import React, { useMemo, useState } from "react";
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
  const projectGroups = useMemo(
    () =>
      todos.reduce((acc, todo) => {
        if (todo.project) {
          if (!acc[todo.project]) {
            acc[todo.project] = [];
          }
          acc[todo.project].push(todo);
        }
        return acc;
      }, {}),
    [todos]
  );

  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <div className="project-tab">
      <h2>Projects</h2>
      {Object.keys(projectGroups).length === 0 ? (
        <p>No projects available.</p>
      ) : (
        Object.entries(projectGroups).map(([projectName, projectTodos]) => {
          const isOpened = openAccordion && openAccordion === projectName;
          return (
            <div key={projectName} className="project-group">
              <h3
                onClick={() => setOpenAccordion(isOpened ? null : projectName)}
              >
                {projectName}{" "}
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
