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
    todo: { completed, id, title, createdBy, tags },
    handleChangeProps,
    deleteTodoProps,
    assignTo,
    addTag,
    removeTag,
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

  return (
    <li className="todo-item">
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleChangeProps(id)}
        />
        <button onClick={() => deleteTodoProps(id)}>Delete</button>
        <span style={completed ? completedStyle : null}>
          {capitalize(title)}
        </span>
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
        <p className="created-by">
          Created By: <br /> <b>{createdBy}</b>
        </p>
      </div>
    </li>
  );
};

export default TodoItem;
