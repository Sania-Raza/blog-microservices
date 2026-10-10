import { useState } from "react";
import axios from "axios";
export default function CommentCreate({ postId }) {
  const [content, setContent] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  return (
    <div>
      <form>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-warning" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
