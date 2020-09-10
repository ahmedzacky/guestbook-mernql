import React, { useState } from "react";

const CreateFeedback = () => {
  const [body, setBody] = useState("");
  const [error, setError] = useState('');
  const handleForm = (e) => {
    setBody(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (body) {
      console.log(`Form submitted:`);
      console.log(`Body: ${body}`);
      setBody("");
      setError({});
	} 
	else {
      setError("Post can't be blank");
    }
  };
  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <h3>Post a Feedback</h3>
        <h6>Be constructive</h6>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={body}
              onChange={handleForm}
            />
          </div>
		  {error && <p className="text-danger">{error}</p>}
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeedback;
