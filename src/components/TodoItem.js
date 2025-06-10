import React, { useEffect, useState } from "react";
import { users } from "../constants/users";
import { appTags } from "../constants/tags";
import { capitalize } from "../util";

const completedStyle = {
  fontStyle: "italic",
  color: "#d35e0f",
  opacity: 0.4,
  textDecoration: "line-through",
};

const TodoItem = (props) => {
  const {
    todo: { completed, id, title, createdBy, assignedTo, tags, dueDate },
    handleChangeProps,
    deleteTodoProps,
    assignTo,
    addTag,
    removeTag,
    addDueDate,
  } = props;

  const [openAddTag, setOpenAddTag] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".add-tag")) {
        setOpenAddTag(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleAddTag = (id, tag) => {
    addTag(id, tag);
    setOpenAddTag(false);
  };

  const assignedUser = users.find((user) => user.id === assignedTo);

  return (
    <li className="todo-item">
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleChangeProps(id)}
        />
        <span style={completed ? completedStyle : null}>
          {capitalize(title)}
        </span>
        <button onClick={() => deleteTodoProps(id)}>Delete</button>
      </div>
      <div className="tags-container">
        <div className="tags">
          {tags.map((tag) => (
            <span className="added-tag" key={tag}>
              {capitalize(tag)}
              <button className="remove-tag" onClick={() => removeTag(id, tag)}>
                x
              </button>
            </span>
          ))}
          <div className="add-tag">
            <button onClick={() => setOpenAddTag(!openAddTag)}>
              + Add a tag
            </button>
            {openAddTag && (
              <ul className="tag-list">
                {appTags
                  .filter((tag) => !tags.includes(tag.name))
                  .map(({ name }) => (
                    <li
                      className="each-tag"
                      key={name}
                      onClick={() => handleAddTag(id, name)}
                    >
                      {capitalize(name)}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <div className="assigned-user-container">
          <p>Assigned User</p>
          <select
            onChange={(e) => assignTo(id, e.target.value)}
            defaultValue={assignedUser ? assignedUser.id : "default"}
          >
            <option value="default" disabled>
              Assign user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>
        <div className="due-date-container">
          <p>Choose due date</p>
          <input
            type="date"
            defaultValue={dueDate || ""}
            placeholder="Choose due date"
            onChange={(e) => addDueDate(id, e.target.value)}
            className="due-date-input"
          />
        </div>
        <p className="created-by">
          Created By: <br /> <b>{createdBy}</b>
        </p>
      </div>
    </li>
  );
};

export default TodoItem;
