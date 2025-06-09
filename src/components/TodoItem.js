import React, { useState } from "react";
import { users } from "../constants/users";
import { appTags } from "../constants/tags";

const completedStyle = {
  fontStyle: "italic",
  color: "#d35e0f",
  opacity: 0.4,
  textDecoration: "line-through",
};

const TodoItem = (props) => {
  const {
    todo: { completed, id, title, createdBy, tags },
    handleChangeProps,
    deleteTodoProps,
    assignTo,
    addTag,
    removeTag,
  } = props;

  const [openAddTag, setOpenAddTag] = useState(false);

  return (
    <li className="todo-item">
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleChangeProps(id)}
        />
        <button onClick={() => deleteTodoProps(id)}>Delete</button>
        <span style={completed ? completedStyle : null}>{title}</span>
      </div>
      <div className="tags-container">
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <div className="add-tag">
            <button onClick={() => setOpenAddTag(!openAddTag)}>
              Add a tag
            </button>
            {openAddTag && (
              <ul className="tag-list">
                {appTags
                  .filter((tag) => !tags.includes(tag))
                  .map((tag) => (
                    <li
                      className="each-tag"
                      key={tag}
                      onClick={() => addTag(id, tag)}
                    >
                      {tag}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <select
          onChange={(e) => assignTo(id, e.target.value)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Assign To
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullname}
            </option>
          ))}
        </select>
        <p className="created-by">Created By: {createdBy}</p>
      </div>
    </li>
  );
};

export default TodoItem;
