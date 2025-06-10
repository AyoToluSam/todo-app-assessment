import React, { useState } from "react";

const InputProject = (addProject) => {
  const [title, setTitle] = useState("");

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container input-project">
      <input
        type="text"
        className="input-text"
        placeholder="Add a new project..."
        value={title}
        name="title"
        onChange={onChange}
      />
      <input type="submit" className="input-submit" value="Submit" />
    </form>
  );
};

export default InputProject;
